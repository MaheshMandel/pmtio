import pricingConfig from '../../pricing-config.json';

      function isSaleActive(config: any) {
        if (config && config.sale && config.sale.active === false) return false;
        const saleEnd = (window as any).SALE_END;
        var end =
          typeof saleEnd === 'number'
            ? saleEnd
            : config && config.sale && config.sale.endDate
              ? new Date(config.sale.endDate).getTime()
              : null;
        return end == null ? true : Date.now() < end;
      }

      function calculateDiscount(price: number, originalPrice: number) {
        if (!originalPrice || originalPrice <= price) return null;
        const savings = originalPrice - price;
        const percentage = ((savings / originalPrice) * 100).toFixed(2);
        return { savings, percentage };
      }

      function getPeriodMonths(period: string) {
        const normalized = (period || '').toLowerCase();
        if (normalized === 'year') return 12;
        if (normalized === '3 months') return 3;
        return null;
      }

      function calculateMonthlyEquivalent(price: number, period: string) {
        const months = getPeriodMonths(period);
        return months ? (price / months).toFixed(2) : null;
      }

      // Compares a plan's price against what the same duration would cost billed
      // monthly (monthlyPrice * number of months) so quarterly/annual plans always
      // show how much they save versus paying month-to-month, sale or no sale.
      function calculateVsMonthlyDiscount(
        displayPrice: number,
        period: string,
        monthlyPrice: number | null,
      ) {
        const months = getPeriodMonths(period);
        if (!monthlyPrice || !months) return null;
        return calculateDiscount(displayPrice, monthlyPrice * months);
      }

      function renderPricingCard(
        plan: any,
        isHighlighted: boolean,
        saleActive: boolean,
        monthlyPrice: number | null,
      ) {
        // During the sale show the discounted `price` with `originalPrice` struck through.
        // Once the sale ends, fall back to comparing the regular price against what the
        // same duration would cost billed monthly, so the discount badge is always shown.
        const onSale =
          saleActive &&
          plan.originalPrice != null &&
          plan.originalPrice > plan.price;
        const displayPrice = onSale
          ? plan.price
          : plan.originalPrice != null
            ? plan.originalPrice
            : plan.price;
        const discountBaseline = onSale
          ? plan.originalPrice
          : monthlyPrice && getPeriodMonths(plan.period)
            ? monthlyPrice * (getPeriodMonths(plan.period) as number)
            : null;
        const discount = onSale
          ? calculateDiscount(plan.price, plan.originalPrice)
          : calculateVsMonthlyDiscount(displayPrice, plan.period, monthlyPrice);
        const monthlyEquiv = calculateMonthlyEquivalent(
          plan.price,
          plan.period,
        );

        let badgeHtml = '';
        if (plan.badge) {
          if (plan.badge.type === 'ribbon') {
            badgeHtml = `
            <div class="absolute -right-10 top-10 rotate-45 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-bold py-1 px-12 shadow-lg z-10">
              ${plan.badge.text}
            </div>`;
          } else if (plan.badge.type === 'pill') {
            badgeHtml = `
            <div class="absolute top-4 right-4 z-10">
              <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                ${plan.badge.icon ? `<i class="fas ${plan.badge.icon}"></i> ` : ''}${plan.badge.text}
              </div>
            </div>`;
          }
        }

        let discountHtml = '';
        if (discount) {
          if (isHighlighted) {
            discountHtml = `
            <div class="flex items-center gap-2 mb-2">
              <span class="text-white/60 line-through text-sm">$${discountBaseline}</span>
              <span class="bg-green-400 text-green-900 text-xs font-bold px-2 py-1 rounded-full">
                SAVE ${discount.percentage}%
              </span>
            </div>
            <p class="text-sm text-green-300 font-semibold mt-2">
              <i class="fas fa-piggy-bank"></i> You save $${discount.savings} ${plan.period === 'year' ? 'annually' : ''}
            </p>`;
            if (monthlyEquiv) {
              discountHtml += `
              <p class="text-xs text-green-300 font-semibold mt-1">
                Just $${monthlyEquiv}/month when billed ${plan.period === 'year' ? 'annually' : 'quarterly'}
              </p>`;
            }
          } else {
            discountHtml = `
            <div class="flex items-center gap-2 mb-2">
              <span class="text-gray-400 line-through text-sm">$${discountBaseline}</span>
              <span class="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                SAVE ${discount.percentage}%
              </span>
            </div>
            <p class="text-sm text-green-600 font-bold mt-2">
              <i class="fas fa-piggy-bank"></i> You save $${discount.savings}
            </p>`;
          }
        }

        let billingNoteHtml = '';
        if (plan.billingNote) {
          if (plan.price === 0) {
            billingNoteHtml = `<p class="text-sm text-green-600 font-semibold mt-2"><i class="fas fa-gift"></i> ${plan.billingNote}</p>`;
          } else {
            billingNoteHtml = `<p class="text-sm text-gray-600 mt-2">${plan.billingNote}</p>`;
          }
        }

        const featuresHtml = plan.features
          .map((feature: string) => {
            const isUnlimitedAccounts = feature === 'Unlimited Accounts';
            const featureContent = isUnlimitedAccounts
              ? `
        <div class="flex items-center gap-2">
          <span class="${isHighlighted ? 'text-white text-sm font-medium' : 'text-gray-700 text-sm'}">${feature}</span>
          <div class="relative group/tooltip">
            <i class="fas fa-info-circle ${isHighlighted ? 'text-white/60' : 'text-gray-400'} text-xs cursor-help"></i>
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-50">
              Unlimited sub-accounts under one prop firm login
              <div class="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
          </div>
        </div>`
              : `<span class="${isHighlighted ? 'text-white text-sm font-medium' : 'text-gray-700 text-sm'}">${feature}</span>`;

            if (isHighlighted) {
              return `
            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <i class="fas fa-check text-white text-xs"></i>
              </div>
              ${featureContent}
            </div>`;
            } else if (plan.price === 0) {
              return `
            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-check text-green-600 text-xs"></i>
              </div>
              ${featureContent}
            </div>`;
            } else {
              return `
            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-[#0084d1]/20 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-check text-[#0084d1] text-xs"></i>
              </div>
              ${featureContent}
            </div>`;
            }
          })
          .join('');

        let cardClasses, bgPattern, priceClasses, buttonClasses;
        if (isHighlighted) {
          cardClasses =
            'bg-gradient-to-br from-[#0084d1] via-[#0055FE] to-[#003d99] border-2 border-[#0084d1] hover:shadow-[#0084d1]/50';
          bgPattern = 'bg-gradient-to-br from-white/10 to-transparent';
          priceClasses = 'text-white';
          buttonClasses = 'bg-white hover:bg-gray-100 text-[#0070b0] font-bold';
        } else if (plan.price === 0) {
          cardClasses =
            'bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-[#0084d1]/50';
          bgPattern = 'bg-gradient-to-br from-[#0084d1]/5 to-transparent';
          priceClasses = 'text-gray-900';
          buttonClasses =
            'bg-gradient-to-r from-[#0084d1] to-[#0055FE] hover:from-[#0055FE] hover:to-[#0084d1] text-white font-semibold';
        } else {
          cardClasses =
            'bg-gradient-to-br from-white to-blue-50 border-2 border-[#0084d1]/30 hover:border-[#0084d1]';
          bgPattern = 'bg-gradient-to-br from-[#0084d1]/10 to-transparent';
          priceClasses =
            'bg-gradient-to-r from-[#0084d1] to-[#0055FE] bg-clip-text text-transparent';
          buttonClasses =
            'bg-gradient-to-r from-[#0084d1] to-[#0055FE] hover:from-[#0055FE] hover:to-[#0084d1] text-white font-bold';
        }

        let iconContainerClasses, iconClasses;
        if (isHighlighted) {
          iconContainerClasses = 'bg-white/20 backdrop-blur-sm';
          iconClasses =
            plan.icon === 'fa-star' ? 'text-yellow-300' : 'text-white';
        } else if (plan.price === 0) {
          iconContainerClasses = 'bg-gradient-to-br from-gray-100 to-gray-200';
          iconClasses = 'text-gray-600';
        } else {
          iconContainerClasses =
            'bg-gradient-to-br from-[#0084d1]/20 to-[#0084d1]/40';
          iconClasses = 'text-[#0084d1]';
        }

        return `
        <div class="group relative rounded-2xl min-w-[320px] max-w-[380px] ${cardClasses} transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden">
          ${badgeHtml}
          <div class="absolute inset-0 ${bgPattern} opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="relative p-8">
            <div class="mb-6">
              <div class="flex items-center gap-2 mb-3">
                <div class="w-10 h-10 rounded-lg ${iconContainerClasses} flex items-center justify-center">
                  <i class="fas ${plan.icon} ${iconClasses} text-lg"></i>
                </div>
                <h3 class="text-2xl font-bold ${isHighlighted ? 'text-white' : 'text-gray-900'}">${plan.name}</h3>
              </div>
              <p class="${isHighlighted ? 'text-white/80' : 'text-gray-600'} text-sm">${plan.description}</p>
            </div>
            <div class="mb-8">
              <div class="flex items-baseline gap-2 ${discount ? 'mb-2' : ''}">
                <span class="text-5xl font-bold ${priceClasses}">$${displayPrice}</span>
                <span class="${isHighlighted ? 'text-white/80' : 'text-gray-500'} font-medium">${plan.periodLabel}</span>
              </div>
              ${discountHtml}
              ${billingNoteHtml}
            </div>
            <div class="space-y-4 mb-8">
              ${featuresHtml}
            </div>
            <a href="${plan.ctaUrl}" ${plan.buttonId ? `id="${plan.buttonId}"` : ''}
              class="block w-full py-3 px-6 ${buttonClasses} rounded-xl text-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${isHighlighted ? 'shadow-lg' : ''}">
              ${plan.buttonText}
              <i class="fas ${plan.buttonIcon} ml-2"></i>
            </a>
          </div>
        </div>`;
      }

export function renderPricingSection() {
        const config = pricingConfig;
        const container = document.getElementById('pricing-cards-container');
        if (!container) return;

        // Resolve sale state once so every card agrees. Order and highlight swap to
        // their originalOrder/originalHighlight values (if present) once the sale ends.
        const saleActive = isSaleActive(config);
        const effectiveOrder = (plan: any) =>
          !saleActive && plan.originalOrder != null
            ? plan.originalOrder
            : plan.order;
        const effectiveHighlight = (plan: any) =>
          !saleActive && plan.originalHighlight != null
            ? plan.originalHighlight
            : plan.highlight;

        const sortedPlans = Object.entries(config.plans)
          .filter(([, plan]) => plan.enabled)
          .sort((a, b) => effectiveOrder(a[1]) - effectiveOrder(b[1]));

        const monthlyPlan = Object.values(config.plans).find(
          (plan: any) => plan.period === 'month',
        ) as any;
        const monthlyPrice = monthlyPlan ? monthlyPlan.price : null;

        container.innerHTML = sortedPlans
          .map(([, plan]) =>
            renderPricingCard(
              plan,
              effectiveHighlight(plan),
              saleActive,
              monthlyPrice,
            ),
          )
          .join('');
      }
