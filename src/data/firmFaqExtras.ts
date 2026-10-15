// Per-firm trader FAQ additions for /prop-firm-faq/<slug> (drafted 5 Oct 2026, from paste-by-page).
// `html` is the visible answer (links kept); `text` is the plain-text twin used for FAQPage JSON-LD.
// action REPLACE: the shared-template question named in `existing` is hidden (page + schema) and this
// entry takes its place. CHECK/ADD/NEW PAGE: appended after the template sections.
export interface FirmFaqExtra { id: string; action: string; existing?: string; q: string; html: string; text: string; group: 'main' | 'futures' | 'cfd' }

export const FIRM_FAQ_EXTRAS: Record<string, FirmFaqExtra[]> = {
  "topstep": [
    {
      "id": "PF-TOPSTEP-01",
      "action": "ADD",
      "q": "I accidentally hedged for a few seconds at Topstep and got flagged. Can I still get a payout?",
      "html": "Usually yes, if it was your first warning. Topstep says opposing positions across accounts are prohibited even when the overlap is brief or unintentional, but a first violation is treated as a warning with a short window to un-hedge, and <a href=\"https://help.topstep.com/en/articles/13747047-understanding-hedging\">warnings alone do not affect payouts</a>. Repeats get harsher: after you sign the hedging acknowledgement, later hedges are liquidated immediately, excessive attempts bring a temporary violation, and an account closed for hedging is not eligible for payouts. Topstep's definition covers the same or correlated instruments across accounts, such as MES/ES and MNQ/NQ, in the Trading Combine, Express Funded and Live accounts.",
      "text": "Usually yes, if it was your first warning. Topstep says opposing positions across accounts are prohibited even when the overlap is brief or unintentional, but a first violation is treated as a warning with a short window to un-hedge, and warnings alone do not affect payouts. Repeats get harsher: after you sign the hedging acknowledgement, later hedges are liquidated immediately, excessive attempts bring a temporary violation, and an account closed for hedging is not eligible for payouts. Topstep's definition covers the same or correlated instruments across accounts, such as MES/ES and MNQ/NQ, in the Trading Combine, Express Funded and Live accounts.",
      "group": "main"
    },
    {
      "id": "PF-TOPSTEP-02",
      "action": "REPLACE",
      "existing": "Does Topstep have a consistency rule?",
      "q": "Did Topstep change the consistency rule to 55%?",
      "html": "Yes. In the Topstep Trading Combine your best day must stay at or below 55% of your Profit Target, and Topstep says there is no buffer: <a href=\"https://help.topstep.com/en/articles/8284208-consistency-at-topstep\">55% is a hard line</a>. If one day goes over, your Profit Target rises to your best day divided by 0.55, and the extra profit has to come on a later trading day, because more profit the same day raises your best day too. The Express Funded Account Consistency path is separate: your largest day must be 40% or less of total net profit before you can request a payout.",
      "text": "Yes. In the Topstep Trading Combine your best day must stay at or below 55% of your Profit Target, and Topstep says there is no buffer: 55% is a hard line. If one day goes over, your Profit Target rises to your best day divided by 0.55, and the extra profit has to come on a later trading day, because more profit the same day raises your best day too. The Express Funded Account Consistency path is separate: your largest day must be 40% or less of total net profit before you can request a payout.",
      "group": "main"
    },
    {
      "id": "PF-TOPSTEP-03",
      "action": "CHECK",
      "existing": "What is a daily loss limit (DLL) at Topstep?",
      "q": "Is Topstep's max loss trailing or end-of-day, and is there a daily loss limit?",
      "html": "Topstep's Maximum Loss Limit trails your end-of-day balance upward, never moves down, and locks once it reaches your starting balance, but it is <a href=\"https://help.topstep.com/en/articles/8284204-what-is-the-maximum-loss-limit\">monitored in real time on realized and unrealized P&amp;L</a>, so an intraday dip through it liquidates the account. It is $2,000, $3,000 or $4,500 for 50K, 100K and 150K accounts. In the Trading Combine and Express Funded Account the <a href=\"https://help.topstep.com/en/articles/10490293-daily-loss-limit-in-the-trading-combine-and-express-funded-account\">Daily Loss Limit is optional</a> ($1,000, $2,000 or $3,000), and hitting it is a forced break for the session, not a rule violation. In the Live Funded Account the Daily Loss Limit is automatic.",
      "text": "Topstep's Maximum Loss Limit trails your end-of-day balance upward, never moves down, and locks once it reaches your starting balance, but it is monitored in real time on realized and unrealized P&L, so an intraday dip through it liquidates the account. It is $2,000, $3,000 or $4,500 for 50K, 100K and 150K accounts. In the Trading Combine and Express Funded Account the Daily Loss Limit is optional ($1,000, $2,000 or $3,000), and hitting it is a forced break for the session, not a rule violation. In the Live Funded Account the Daily Loss Limit is automatic.",
      "group": "main"
    },
    {
      "id": "PF-TOPSTEP-04",
      "action": "CHECK",
      "existing": "How often can I request payouts at Topstep?",
      "q": "When can I request a payout from a Topstep Express Funded Account, and how much can I take?",
      "html": "On the Standard path you need 5 winning days of $150 or more net P&amp;L (not necessarily consecutive) plus profit since your last payout. On the Consistency path you need 3 trading days with your largest day at or below 40% of net profit. Each request can be up to 50% of the balance, capped by account size, for example $2,000 Standard or $3,000 Consistency on a 50K, per Topstep's <a href=\"https://help.topstep.com/en/articles/8284233-topstep-payout-policy\">payout policy</a>. The minimum is $125 and the split is 90/10. Topstep recommends waiting until your Maximum Loss Limit reaches $0 before taking payouts. Live Funded payouts have no dollar cap.",
      "text": "On the Standard path you need 5 winning days of $150 or more net P&L (not necessarily consecutive) plus profit since your last payout. On the Consistency path you need 3 trading days with your largest day at or below 40% of net profit. Each request can be up to 50% of the balance, capped by account size, for example $2,000 Standard or $3,000 Consistency on a 50K, per Topstep's payout policy. The minimum is $125 and the split is 90/10. Topstep recommends waiting until your Maximum Loss Limit reaches $0 before taking payouts. Live Funded payouts have no dollar cap.",
      "group": "main"
    },
    {
      "id": "PF-TOPSTEP-05",
      "action": "CHECK",
      "existing": "How often can I request payouts at Topstep?",
      "q": "How do I get moved to a Topstep Live Funded Account? Do I need a set number of payouts?",
      "html": "There is no fixed number. Topstep says its Risk Team reviews each trader case by case, looking at consistency, risk management, position sizing, products traded, use of stops, payout history and overall behavior, and its FAQ answers the 5-payout question with a plain <a href=\"https://help.topstep.com/en/articles/13747178-live-funded-account-call-up-and-call-down-process\">No</a>. Your Live starting balance is 20% of your cumulative Express Funded Account balance, capped at your account size, with a $10,000 minimum; the other 80% is held in Reserve. Topstep can also move a Live trader back to a single Shoulder Tap Express Funded Account without warning.",
      "text": "There is no fixed number. Topstep says its Risk Team reviews each trader case by case, looking at consistency, risk management, position sizing, products traded, use of stops, payout history and overall behavior, and its FAQ answers the 5-payout question with a plain No. Your Live starting balance is 20% of your cumulative Express Funded Account balance, capped at your account size, with a $10,000 minimum; the other 80% is held in Reserve. Topstep can also move a Live trader back to a single Shoulder Tap Express Funded Account without warning.",
      "group": "main"
    },
    {
      "id": "PF-TOPSTEP-06",
      "action": "CHECK",
      "existing": "Can I automate Topstep with TradingView via PickMyTrade?",
      "q": "Can I use the ProjectX API to trade a Topstep Express Funded Account, or only a Live Funded Account?",
      "html": "Express Funded, yes; Live Funded, no. Topstep's <a href=\"https://help.topstep.com/en/articles/11187768-topstepx-api-access\">TopstepX API Access page</a> says custom bots are allowed through the TopstepX/ProjectX API, subject to platform rules and its ban on high-frequency trading, but Live Funded accounts cannot trade through the API. API Access is billed separately at $29 a month, or $14.50 with Topstep's 50% code. Orders must still originate from your own device, not a VPS. Topstep treats a rule violation the same whether it comes from manual trading or automation, and third-party tools on the API are used at your own risk.",
      "text": "Express Funded, yes; Live Funded, no. Topstep's TopstepX API Access page says custom bots are allowed through the TopstepX/ProjectX API, subject to platform rules and its ban on high-frequency trading, but Live Funded accounts cannot trade through the API. API Access is billed separately at $29 a month, or $14.50 with Topstep's 50% code. Orders must still originate from your own device, not a VPS. Topstep treats a rule violation the same whether it comes from manual trading or automation, and third-party tools on the API are used at your own risk.",
      "group": "main"
    },
    {
      "id": "PF-TOPSTEP-07",
      "action": "ADD",
      "q": "Can I trade my Topstep account from a VPS or with a VPN?",
      "html": "No. Topstep's API page says all trading activity must originate from your personal device and that VPS, VPNs and remote servers are prohibited by its Terms of Use; running automation on a VPS can lead to suspension or removal. Its <a href=\"https://help.topstep.com/en/articles/10296582-prohibited-conduct\">Prohibited Conduct page</a> also bans VPNs, proxies, TOR and other identity-masking services. A private server is allowed only for work that never touches order flow, such as storing historical data, backtesting, logging or a read-only dashboard. In Topstep's words, your server <a href=\"https://help.topstep.com/en/articles/11187768-topstepx-api-access\">can watch and record, but it cannot trade</a>.",
      "text": "No. Topstep's API page says all trading activity must originate from your personal device and that VPS, VPNs and remote servers are prohibited by its Terms of Use; running automation on a VPS can lead to suspension or removal. Its Prohibited Conduct page also bans VPNs, proxies, TOR and other identity-masking services. A private server is allowed only for work that never touches order flow, such as storing historical data, backtesting, logging or a read-only dashboard. In Topstep's words, your server can watch and record, but it cannot trade.",
      "group": "main"
    },
    {
      "id": "PF-TOPSTEP-08",
      "action": "REPLACE",
      "existing": "Can I trade news events at Topstep?",
      "q": "Can I trade CPI or FOMC at Topstep?",
      "html": "FOMC and most releases, yes; CPI has a blackout window. Topstep does not require you to flatten for economic releases, but around CPI it <a href=\"https://help.topstep.com/en/articles/13613539-risk-adjustments-high-risk-high-volatility\">blocks new opening trades</a> in ES, RTY, YM, NQ, NKD, GC, SI, HG and PL minis from 5 minutes before to 5 minutes after the release. Micros are capped during that window, for example 3 contracts on a 50K account, and pending orders will not fill. Separately, Topstep prohibits purposely trading your full maximum position size into a major scheduled news event, and it does not adjust accounts for slippage losses.",
      "text": "FOMC and most releases, yes; CPI has a blackout window. Topstep does not require you to flatten for economic releases, but around CPI it blocks new opening trades in ES, RTY, YM, NQ, NKD, GC, SI, HG and PL minis from 5 minutes before to 5 minutes after the release. Micros are capped during that window, for example 3 contracts on a 50K account, and pending orders will not fill. Separately, Topstep prohibits purposely trading your full maximum position size into a major scheduled news event, and it does not adjust accounts for slippage losses.",
      "group": "main"
    },
    {
      "id": "PF-TOPSTEP-09",
      "action": "REPLACE",
      "existing": "Does Topstep allow copy trading?",
      "q": "Can I copy trade between my own Topstep accounts?",
      "html": "Yes, on Trading Combine and Express Funded accounts. TopstepX has a built-in Trade Copier that mirrors a Lead account to Follower accounts, and the Lead must have the lowest maximum position size in the group. Live Funded accounts <a href=\"https://help.topstep.com/en/articles/14434175-topstepx\">cannot use the Trade Copier</a>. Followers are unlinked when you request a payout, and if the Lead hits its Daily Loss Limit or is liquidated, the followers are flattened with it. Topstep's hedging page adds that you stay responsible for any opposite positions created by copy trading software or third-party tools.",
      "text": "Yes, on Trading Combine and Express Funded accounts. TopstepX has a built-in Trade Copier that mirrors a Lead account to Follower accounts, and the Lead must have the lowest maximum position size in the group. Live Funded accounts cannot use the Trade Copier. Followers are unlinked when you request a payout, and if the Lead hits its Daily Loss Limit or is liquidated, the followers are flattened with it. Topstep's hedging page adds that you stay responsible for any opposite positions created by copy trading software or third-party tools.",
      "group": "main"
    },
    {
      "id": "PF-TOPSTEP-10",
      "action": "ADD",
      "q": "How do I get out of Topstep's Responsible Trading Program?",
      "html": "Reach Live and make $10,000 there. Topstep says there is <a href=\"https://help.topstep.com/en/articles/13620045-what-is-the-responsible-trading-program\">no set timeline</a>: you must be called up to a Live Funded Account and grow that account's balance by $10,000 in profit earned in Live, not in a Trading Combine or Express Funded Account. While you are in the program, new Trading Combines and Express Funded Accounts get a Daily Loss Limit ($1,000, $2,000 or $3,000 by size), passed Combines go to the 40% Consistency path, and you can still request payouts of up to $6,000 every 3 trading days if you meet the consistency requirements.",
      "text": "Reach Live and make $10,000 there. Topstep says there is no set timeline: you must be called up to a Live Funded Account and grow that account's balance by $10,000 in profit earned in Live, not in a Trading Combine or Express Funded Account. While you are in the program, new Trading Combines and Express Funded Accounts get a Daily Loss Limit ($1,000, $2,000 or $3,000 by size), passed Combines go to the 40% Consistency path, and you can still request payouts of up to $6,000 every 3 trading days if you meet the consistency requirements.",
      "group": "main"
    }
  ],
  "fundednext": [
    {
      "id": "PF-FNFUT-01",
      "action": "ADD",
      "q": "Can I use EAs, trading bots and a VPS on FundedNext Futures?",
      "html": "Yes. <a href=\"https://helpfutures.fundednext.com/en/articles/17225788-fundednext-futures-most-frequently-asked-questions\">FundedNext Futures says</a> you may use automated trading systems such as EAs and trading bots during both the Challenge and on FundedNext Accounts, and that a VPS or VPN is allowed on both stages. FundedNext gives no setup or troubleshooting support for bots, and strategies that exploit system weaknesses, such as latency abuse or order flooding, are prohibited. Bots that trade at the frequency and speed of <a href=\"https://helpfutures.fundednext.com/en/articles/17230388-does-fundednext-futures-allow-high-frequency-trading-hft\">high-frequency trading</a> are reviewed and can lead to termination. These rules are for the Futures program only; FundedNext CFD has different EA and VPS rules.",
      "text": "Yes. FundedNext Futures says you may use automated trading systems such as EAs and trading bots during both the Challenge and on FundedNext Accounts, and that a VPS or VPN is allowed on both stages. FundedNext gives no setup or troubleshooting support for bots, and strategies that exploit system weaknesses, such as latency abuse or order flooding, are prohibited. Bots that trade at the frequency and speed of high-frequency trading are reviewed and can lead to termination. These rules are for the Futures program only; FundedNext CFD has different EA and VPS rules.",
      "group": "futures"
    },
    {
      "id": "PF-FNFUT-02",
      "action": "CHECK",
      "existing": "Does FundedNext allow copy trading?",
      "q": "Can I copy trades between my own FundedNext Futures accounts, or from another prop firm?",
      "html": "Yes, if every account is yours. <a href=\"https://helpfutures.fundednext.com/en/articles/17230319-what-is-copy-group-trading-policy-at-fundednext-futures\">FundedNext Futures allows</a> copying between your own FundedNext accounts, and between FundedNext and other prop firms when you own all the accounts involved. It may ask you to prove every account is registered under exactly the same name. Copy tools are allowed, including Tradovate's built-in copier, NinjaTrader modules and third-party platforms, as long as you copy only your own trades. Copying another trader's account, group trading and following signal services are strictly prohibited, even through automated tools.",
      "text": "Yes, if every account is yours. FundedNext Futures allows copying between your own FundedNext accounts, and between FundedNext and other prop firms when you own all the accounts involved. It may ask you to prove every account is registered under exactly the same name. Copy tools are allowed, including Tradovate's built-in copier, NinjaTrader modules and third-party platforms, as long as you copy only your own trades. Copying another trader's account, group trading and following signal services are strictly prohibited, even through automated tools.",
      "group": "futures"
    },
    {
      "id": "PF-FNFUT-03",
      "action": "ADD",
      "q": "Is it hedging on FundedNext Futures if I am long one index and short another, or long NQ and short MNQ?",
      "html": "Often, yes. <a href=\"https://helpfutures.fundednext.com/en/articles/14298337-what-are-the-prohibited-trading-strategies-of-fundednext-futures\">FundedNext Futures prohibits</a> hedging with correlated instruments, meaning opposite positions at the same time on two different underlyings that move together in the same asset group. Its example is buying ES while selling YM. It also bans reverse hedging, such as buying 1 NQ and selling 7 MNQ in one account, or buying NQ in one account and selling MNQ in another. The page does not list which markets share an asset group, so for pairs like NQ against gold, ask support before trading it.",
      "text": "Often, yes. FundedNext Futures prohibits hedging with correlated instruments, meaning opposite positions at the same time on two different underlyings that move together in the same asset group. Its example is buying ES while selling YM. It also bans reverse hedging, such as buying 1 NQ and selling 7 MNQ in one account, or buying NQ in one account and selling MNQ in another. The page does not list which markets share an asset group, so for pairs like NQ against gold, ask support before trading it.",
      "group": "futures"
    },
    {
      "id": "PF-FNFUT-04",
      "action": "REPLACE",
      "existing": "Does FundedNext have a consistency rule?",
      "q": "Does FundedNext Futures have a consistency rule?",
      "html": "It depends on the model and stage. <a href=\"https://helpfutures.fundednext.com/en/articles/17230245-is-there-any-consistency-rule-to-be-followed-in-the-fundednext-futures-challenge-fundednext-account\">FundedNext Futures uses a 40% consistency rule</a>. In the Challenge, it applies to Legacy and Flex: one day's profit cannot exceed 40% of the profit target, or the target is recalculated. On a $50,000 Legacy Challenge with a $3,000 target, a $1,500 day raises the target to $3,750. Once funded, only Rapid Pro uses it, as a withdrawal gate: your best day must be 40% or less of total profit. Rapid Daily has no consistency rule, and Legacy and Flex drop it once funded.",
      "text": "It depends on the model and stage. FundedNext Futures uses a 40% consistency rule. In the Challenge, it applies to Legacy and Flex: one day's profit cannot exceed 40% of the profit target, or the target is recalculated. On a $50,000 Legacy Challenge with a $3,000 target, a $1,500 day raises the target to $3,750. Once funded, only Rapid Pro uses it, as a withdrawal gate: your best day must be 40% or less of total profit. Rapid Daily has no consistency rule, and Legacy and Flex drop it once funded.",
      "group": "futures"
    },
    {
      "id": "PF-FNFUT-05",
      "action": "CHECK",
      "existing": "Can I trade news events at FundedNext?",
      "q": "Can I trade news or hold positions overnight on FundedNext Futures?",
      "html": "News, yes; overnight, no. <a href=\"https://helpfutures.fundednext.com/en/articles/17225788-fundednext-futures-most-frequently-asked-questions\">FundedNext Futures does not restrict news trading</a>, but warns that a stop loss may fill away from your price in fast markets. Overnight and weekend holding are not permitted: every position must be closed by 3:10 PM CT each trading day, and anything still open is closed automatically at that time. Trading resumes at 5:00 PM CT, and on Sunday at 5:00 PM CT after the weekend. This differs from FundedNext CFD, which allows overnight holding.",
      "text": "News, yes; overnight, no. FundedNext Futures does not restrict news trading, but warns that a stop loss may fill away from your price in fast markets. Overnight and weekend holding are not permitted: every position must be closed by 3:10 PM CT each trading day, and anything still open is closed automatically at that time. Trading resumes at 5:00 PM CT, and on Sunday at 5:00 PM CT after the weekend. This differs from FundedNext CFD, which allows overnight holding.",
      "group": "futures"
    },
    {
      "id": "PF-FNFUT-06",
      "action": "ADD",
      "q": "Is there a minimum hold time on FundedNext Futures? What is the micro-scalping rule?",
      "html": "There is no hard minimum, but <a href=\"https://helpfutures.fundednext.com/en/articles/17230376-what-is-the-micro-scalping-policy-in-fundednext-futures\">FundedNext Futures watches trades closed within 10 seconds</a>, which it calls micro-scalping. It measures the share of a cycle's profit that came from those trades; losing trades do not count. At 30% you get a warning. At 40% or more, a Challenge account cannot advance until the share drops, and on a funded account the micro-scalping profit for that cycle is deducted in full. The rule never terminates a funded account, and violations are tracked per account.",
      "text": "There is no hard minimum, but FundedNext Futures watches trades closed within 10 seconds, which it calls micro-scalping. It measures the share of a cycle's profit that came from those trades; losing trades do not count. At 30% you get a warning. At 40% or more, a Challenge account cannot advance until the share drops, and on a funded account the micro-scalping profit for that cycle is deducted in full. The rule never terminates a funded account, and violations are tracked per account.",
      "group": "futures"
    },
    {
      "id": "PF-FNFUT-07",
      "action": "ADD",
      "q": "When do I need to do KYC on FundedNext Futures, and does it cover my CFD accounts?",
      "html": "On FundedNext Futures, <a href=\"https://helpfutures.fundednext.com/en/articles/17228945-how-does-kyc-verification-work-at-fundednext\">KYC is required before your first Performance Reward withdrawal</a>, not before trading. You can trade the funded account right after passing, but your status must show Verified to be paid. You submit one photo ID and a live selfie, and review usually takes 24 to 48 hours. A driving license is accepted only for traders in the U.S., Australia, Canada and New Zealand. KYC is profile-level, so one approval covers all your Futures and CFD accounts. You get 3 submission attempts.",
      "text": "On FundedNext Futures, KYC is required before your first Performance Reward withdrawal, not before trading. You can trade the funded account right after passing, but your status must show Verified to be paid. You submit one photo ID and a live selfie, and review usually takes 24 to 48 hours. A driving license is accepted only for traders in the U.S., Australia, Canada and New Zealand. KYC is profile-level, so one approval covers all your Futures and CFD accounts. You get 3 submission attempts.",
      "group": "futures"
    },
    {
      "id": "PF-FNFUT-08",
      "action": "REPLACE",
      "existing": "What is a daily loss limit (DLL) at FundedNext?",
      "q": "Does FundedNext Futures have a daily loss limit, and can I set my own as a warning?",
      "html": "Only some models have one. <a href=\"https://helpfutures.fundednext.com/en/articles/17230292-daily-loss-limit-and-maximum-loss-limit-at-fundednext-futures\">On FundedNext Futures</a>, Rapid Daily has a daily loss limit, and Rapid Pro has one only with the add-on; Legacy and Flex have none. Hitting it is a soft breach: trading stops for the day and resets next day. Every model has a trailing end-of-day Maximum Loss Limit, and a floating loss that reaches it breaches the account instantly. FundedNext notes you can turn on a manual daily loss limit in Tradovate's risk settings as a personal guardrail; it does not change the official rules.",
      "text": "Only some models have one. On FundedNext Futures, Rapid Daily has a daily loss limit, and Rapid Pro has one only with the add-on; Legacy and Flex have none. Hitting it is a soft breach: trading stops for the day and resets next day. Every model has a trailing end-of-day Maximum Loss Limit, and a floating loss that reaches it breaches the account instantly. FundedNext notes you can turn on a manual daily loss limit in Tradovate's risk settings as a personal guardrail; it does not change the official rules.",
      "group": "futures"
    },
    {
      "id": "PF-FNCFD-01",
      "action": "REPLACE",
      "existing": "Does FundedNext allow automated trading / EAs?",
      "q": "Are EAs and trading bots allowed on FundedNext CFD accounts?",
      "html": "On FundedNext CFD it depends on account size and platform. <a href=\"https://help.fundednext.com/en/articles/8020763-is-ea-allowed-in-fundednext\">EAs, indicators and bots are allowed on MT4 and MT5 for accounts below $50,000</a>, with an extra EA usage fee. Accounts of $50,000 and above must trade fully manually in both the Challenge and the FundedNext Account, and even tools that only set SL, TP or lot size count as EAs. EAs are not allowed on cTrader or Match-Trader at any size. Each EA must use its own strategy, and EAs built to pass prop challenges are banned.",
      "text": "On FundedNext CFD it depends on account size and platform. EAs, indicators and bots are allowed on MT4 and MT5 for accounts below $50,000, with an extra EA usage fee. Accounts of $50,000 and above must trade fully manually in both the Challenge and the FundedNext Account, and even tools that only set SL, TP or lot size count as EAs. EAs are not allowed on cTrader or Match-Trader at any size. Each EA must use its own strategy, and EAs built to pass prop challenges are banned.",
      "group": "cfd"
    },
    {
      "id": "PF-FNCFD-02",
      "action": "ADD",
      "q": "Which FundedNext CFD accounts allow a VPS?",
      "html": "On FundedNext CFD, <a href=\"https://help.fundednext.com/en/articles/8223809-can-i-use-a-vpn-or-vps\">a VPS is allowed only on accounts below $50,000</a>, for an extra fee, in both the Challenge and the FundedNext Account. On $50,000 and above, traders must place every trade directly from their own device. Even on smaller accounts the VPS must run a trade-taking EA: manual trading through a VPS is strictly prohibited, and a VPS EA that only adjusts SL, TP or lot size also breaks the policy. Shared VPS connections, broker-sponsored MetaTrader VPS and VPS IPs from restricted countries are not allowed.",
      "text": "On FundedNext CFD, a VPS is allowed only on accounts below $50,000, for an extra fee, in both the Challenge and the FundedNext Account. On $50,000 and above, traders must place every trade directly from their own device. Even on smaller accounts the VPS must run a trade-taking EA: manual trading through a VPS is strictly prohibited, and a VPS EA that only adjusts SL, TP or lot size also breaks the policy. Shared VPS connections, broker-sponsored MetaTrader VPS and VPS IPs from restricted countries are not allowed.",
      "group": "cfd"
    },
    {
      "id": "PF-FNCFD-03",
      "action": "ADD",
      "q": "Can I use a VPN or switch networks and devices on FundedNext CFD?",
      "html": "Yes, within limits. FundedNext CFD <a href=\"https://help.fundednext.com/en/articles/8223809-can-i-use-a-vpn-or-vps\">lets you use a VPN</a> on Challenge and FundedNext Accounts and recommends a paid VPN over a free one. You may trade from home Wi-Fi, mobile data or public internet, as long as the IP address, including a VPN address, is not from a restricted country. <a href=\"https://help.fundednext.com/en/articles/9351758-fundednext-trading-device-and-network-policy\">Every device must be your own</a>; trading on a device shared with another trader is prohibited, even a family member's. MT4 and MT5 cannot be accessed from US-based IP addresses because of MetaQuotes' regional limits.",
      "text": "Yes, within limits. FundedNext CFD lets you use a VPN on Challenge and FundedNext Accounts and recommends a paid VPN over a free one. You may trade from home Wi-Fi, mobile data or public internet, as long as the IP address, including a VPN address, is not from a restricted country. Every device must be your own; trading on a device shared with another trader is prohibited, even a family member's. MT4 and MT5 cannot be accessed from US-based IP addresses because of MetaQuotes' regional limits.",
      "group": "cfd"
    },
    {
      "id": "PF-FNCFD-04",
      "action": "ADD",
      "q": "How many trades or server messages per day count as hyperactivity on FundedNext?",
      "html": "<a href=\"https://help.fundednext.com/en/articles/8020351-what-are-the-restricted-prohibited-trading-strategies\">FundedNext treats an account as hyperactive</a> at 200 trades or 2,000 server messages in a single day. Server messages include order changes such as moving a stop loss or take profit and updating limit orders, so heavy order editing can trip the limit with far fewer than 200 trades. The help center describes a first warning, a second warning, and a breach on the third occurrence. Warnings are cumulative across accounts, and an account that generates 15,000 messages in a day is forcefully disabled.",
      "text": "FundedNext treats an account as hyperactive at 200 trades or 2,000 server messages in a single day. Server messages include order changes such as moving a stop loss or take profit and updating limit orders, so heavy order editing can trip the limit with far fewer than 200 trades. The help center describes a first warning, a second warning, and a breach on the third occurrence. Warnings are cumulative across accounts, and an account that generates 15,000 messages in a day is forcefully disabled.",
      "group": "cfd"
    },
    {
      "id": "PF-FNCFD-05",
      "action": "ADD",
      "q": "If I close a trade before it reaches 3% risk and re-enter right away, does FundedNext reset my 3% risk?",
      "html": "Not necessarily. On a FundedNext Account, the funded stage of FundedNext CFD, <a href=\"https://help.fundednext.com/en/articles/14702245-what-are-the-risk-limits-on-a-fundednext-account\">risk is capped at 3% at any given time</a>, measured against the initial balance from stop-loss placement and from realized and floating losses across all trades. The limit covers all entries tied to the same trading idea or position, even if split into multiple orders, so a quick close and re-entry on the same idea can be counted together. The help center gives no time gap that makes a re-entry a new idea, so confirm your exact setup with support.",
      "text": "Not necessarily. On a FundedNext Account, the funded stage of FundedNext CFD, risk is capped at 3% at any given time, measured against the initial balance from stop-loss placement and from realized and floating losses across all trades. The limit covers all entries tied to the same trading idea or position, even if split into multiple orders, so a quick close and re-entry on the same idea can be counted together. The help center gives no time gap that makes a re-entry a new idea, so confirm your exact setup with support.",
      "group": "cfd"
    },
    {
      "id": "PF-FNCFD-06",
      "action": "ADD",
      "q": "What happens if I break the 3% risk rule on a FundedNext account? Is the 1% limit permanent?",
      "html": "On a FundedNext CFD funded account, <a href=\"https://help.fundednext.com/en/articles/14702245-what-are-the-risk-limits-on-a-fundednext-account\">the first breach of the 3% risk limit brings a formal warning</a>, and all profit from the violating trades is deducted from that cycle's Performance Reward. A second violation on the same account deducts that profit again and permanently reclassifies the account to 1% allowable risk at a time. Violations are tracked per account and do not carry over to other accounts, but a merged account inherits the higher violation count. A trade closed without any stop loss is flagged separately as a <a href=\"https://help.fundednext.com/en/articles/14192538-what-are-the-risk-violation-types\">No SL Trade</a>.",
      "text": "On a FundedNext CFD funded account, the first breach of the 3% risk limit brings a formal warning, and all profit from the violating trades is deducted from that cycle's Performance Reward. A second violation on the same account deducts that profit again and permanently reclassifies the account to 1% allowable risk at a time. Violations are tracked per account and do not carry over to other accounts, but a merged account inherits the higher violation count. A trade closed without any stop loss is flagged separately as a No SL Trade.",
      "group": "cfd"
    },
    {
      "id": "PF-FNCFD-07",
      "action": "REPLACE",
      "existing": "Does FundedNext allow copy trading?",
      "q": "Can I copy trades between my own FundedNext CFD accounts?",
      "html": "Only between Challenge accounts. <a href=\"https://help.fundednext.com/en/articles/8019805-what-is-the-copy-trading-rule-at-fundednext\">FundedNext CFD allows copying between Challenge accounts you own</a>, up to a combined $300,000, with one account set as master. Copying between a FundedNext Account and any other FundedNext Account or Challenge account is prohibited, even if you own both: first a warning with no reward for that cycle, then termination. External cloud-based copy services are not allowed; a VPS-based copier is permitted only between your own Challenge accounts. Copying with other people, including family, leads to immediate termination.",
      "text": "Only between Challenge accounts. FundedNext CFD allows copying between Challenge accounts you own, up to a combined $300,000, with one account set as master. Copying between a FundedNext Account and any other FundedNext Account or Challenge account is prohibited, even if you own both: first a warning with no reward for that cycle, then termination. External cloud-based copy services are not allowed; a VPS-based copier is permitted only between your own Challenge accounts. Copying with other people, including family, leads to immediate termination.",
      "group": "cfd"
    },
    {
      "id": "PF-FNCFD-08",
      "action": "REPLACE",
      "existing": "Can I trade news events at FundedNext?",
      "q": "Can I trade news on FundedNext CFD?",
      "html": "Yes. <a href=\"https://help.fundednext.com/en/articles/10701447-is-news-trading-allowed-at-fundednext\">FundedNext CFD allows news trading</a> in both the Challenge and the FundedNext Account. On Stellar 1-Step, 2-Step and Lite FundedNext Accounts, trades opened or closed from 5 minutes before to 5 minutes after a listed high-impact event count only 40% of their profit, while losses count in full. The rule includes pending orders, stop losses and take profits. Challenge accounts are exempt, you may hold running trades through news, and only high-impact events tied to the pair you trade apply.",
      "text": "Yes. FundedNext CFD allows news trading in both the Challenge and the FundedNext Account. On Stellar 1-Step, 2-Step and Lite FundedNext Accounts, trades opened or closed from 5 minutes before to 5 minutes after a listed high-impact event count only 40% of their profit, while losses count in full. The rule includes pending orders, stop losses and take profits. Challenge accounts are exempt, you may hold running trades through news, and only high-impact events tied to the pair you trade apply.",
      "group": "cfd"
    },
    {
      "id": "PF-FNCFD-09",
      "action": "ADD",
      "q": "Is there a minimum hold time on FundedNext CFD? What is Quick Strike?",
      "html": "<a href=\"https://help.fundednext.com/en/articles/14702484-understanding-the-quick-strike-parameter-on-fundednext\">FundedNext CFD calls any position closed within 30 seconds a Quick Strike trade</a>. It measures the share of a cycle's profit that came from those trades, and 30% or more is a violation. On a Challenge account, a warning comes at 20%, and at 30% advancement is paused until the share drops. On a FundedNext Account, a warning comes at 20%; if the share then reaches 30%, that profit is deducted, and the account is terminated if it is still at 30% or more at the end of the cycle.",
      "text": "FundedNext CFD calls any position closed within 30 seconds a Quick Strike trade. It measures the share of a cycle's profit that came from those trades, and 30% or more is a violation. On a Challenge account, a warning comes at 20%, and at 30% advancement is paused until the share drops. On a FundedNext Account, a warning comes at 20%; if the share then reaches 30%, that profit is deducted, and the account is terminated if it is still at 30% or more at the end of the cycle.",
      "group": "cfd"
    },
    {
      "id": "PF-FNCFD-10",
      "action": "CHECK",
      "existing": "How often can I request payouts at FundedNext?",
      "q": "When do I do KYC at FundedNext CFD, and how fast are payouts processed?",
      "html": "On Stellar Challenge accounts, <a href=\"https://help.fundednext.com/en/articles/15442628-understanding-the-kyc-verification-process-at-fundednext\">KYC comes after you pass and the server resets</a>; on Stellar Instant, it comes before your first Performance Reward. KYC is profile-level, so one approval covers your CFD and Futures accounts. Your status must be Approved to be paid, though you can keep trading while it is pending. FundedNext commits to processing a Performance Reward <a href=\"https://help.fundednext.com/en/articles/8569879-what-is-the-timeframe-for-fundednext-to-process-performance-rewards\">within 24 hours</a> of the request, adding $1,000 if it is late, except for bank transfers. The 90-day KYC renewal is temporarily paused.",
      "text": "On Stellar Challenge accounts, KYC comes after you pass and the server resets; on Stellar Instant, it comes before your first Performance Reward. KYC is profile-level, so one approval covers your CFD and Futures accounts. Your status must be Approved to be paid, though you can keep trading while it is pending. FundedNext commits to processing a Performance Reward within 24 hours of the request, adding $1,000 if it is late, except for bank transfers. The 90-day KYC renewal is temporarily paused.",
      "group": "cfd"
    }
  ],
  "fundingpips": [
    {
      "id": "PF-FPIPS-01",
      "action": "REPLACE",
      "existing": "Does FundingPips allow automated trading / EAs?",
      "q": "Does FundingPips allow EAs, and can an EA fully automate my trading?",
      "html": "It depends on whose EA it is. <a href=\"https://help.fundingpips.com/hc/en-us/articles/34505029138449-Trading-Conduct-and-Security-Standards\">FundingPips allows third-party EAs only as a trade or risk manager</a>; using one for anything else leads to denial of the evaluation or reward and account closure. An EA you developed yourself may fully automate trading if you can prove ownership, for example with uncompiled source code, version history or a live call explaining its logic. A compiled file alone is not proof. On the 1K Instant Account, third-party EAs and copiers are allowed; in the Monthly Competition, all EAs are banned.",
      "text": "It depends on whose EA it is. FundingPips allows third-party EAs only as a trade or risk manager; using one for anything else leads to denial of the evaluation or reward and account closure. An EA you developed yourself may fully automate trading if you can prove ownership, for example with uncompiled source code, version history or a live call explaining its logic. A compiled file alone is not proof. On the 1K Instant Account, third-party EAs and copiers are allowed; in the Monthly Competition, all EAs are banned.",
      "group": "main"
    },
    {
      "id": "PF-FPIPS-02",
      "action": "CHECK",
      "existing": "Does FundingPips allow copy trading?",
      "q": "Can I copy trades between my FundingPips accounts or to an account at another prop firm?",
      "html": "Yes, outward only. <a href=\"https://help.fundingpips.com/hc/en-us/articles/34505029138449-Trading-Conduct-and-Security-Standards\">FundingPips permits copying</a> between your own FundingPips accounts and using a FundingPips account as the master to copy to an external account. Copying into a FundingPips account from any outside source, such as a signal provider or a copier where FundingPips is the follower, is prohibited and treated as third-party account management. FundingPips also runs <a href=\"https://help.fundingpips.com/hc/en-us/articles/49580068780817-Trade-Copier\">its own Trade Copier</a> in the dashboard, where only a FundingPips account can be the lead. When connecting a copier, use the read-only investor password.",
      "text": "Yes, outward only. FundingPips permits copying between your own FundingPips accounts and using a FundingPips account as the master to copy to an external account. Copying into a FundingPips account from any outside source, such as a signal provider or a copier where FundingPips is the follower, is prohibited and treated as third-party account management. FundingPips also runs its own Trade Copier in the dashboard, where only a FundingPips account can be the lead. When connecting a copier, use the read-only investor password.",
      "group": "main"
    },
    {
      "id": "PF-FPIPS-03",
      "action": "ADD",
      "q": "Can I use a VPN or VPS on FundingPips, and what if my IP changes or I travel?",
      "html": "<a href=\"https://help.fundingpips.com/hc/en-us/articles/34505029138449-Trading-Conduct-and-Security-Standards\">No VPN or VPS while you access your FundingPips trading account</a>; disable it first. The region of your IP must stay consistent from purchase through the Master Account. You may travel, use several ISPs, and use multiple devices in the same city. If an unrealistic regional change shows up, the Responsible Trading Team contacts you first and may ask for a boarding pass, passport stamp or live video. Switching between Wi-Fi and mobile data in the same area is described as not a concern.",
      "text": "No VPN or VPS while you access your FundingPips trading account; disable it first. The region of your IP must stay consistent from purchase through the Master Account. You may travel, use several ISPs, and use multiple devices in the same city. If an unrealistic regional change shows up, the Responsible Trading Team contacts you first and may ask for a boarding pass, passport stamp or live video. Switching between Wi-Fi and mobile data in the same area is described as not a concern.",
      "group": "main"
    },
    {
      "id": "PF-FPIPS-04",
      "action": "ADD",
      "q": "Is hedging allowed on FundingPips? What about the same trade on two of my accounts?",
      "html": "No. <a href=\"https://help.fundingpips.com/hc/en-us/articles/34505029138449-Trading-Conduct-and-Security-Standards\">FundingPips lists hedging among its forbidden strategies</a>, alongside opposite account trading, and says forbidden strategies lead to immediate account termination. Trading the same direction on your own accounts is fine: FundingPips says copying the same directional strategy across your personal accounts is permitted and is not opposite account trading. What it bans is deliberately opening opposing positions across accounts so one side wins whatever the market does. The page does not define whether different instruments, such as NAS100 against gold, count as a hedge.",
      "text": "No. FundingPips lists hedging among its forbidden strategies, alongside opposite account trading, and says forbidden strategies lead to immediate account termination. Trading the same direction on your own accounts is fine: FundingPips says copying the same directional strategy across your personal accounts is permitted and is not opposite account trading. What it bans is deliberately opening opposing positions across accounts so one side wins whatever the market does. The page does not define whether different instruments, such as NAS100 against gold, count as a hedge.",
      "group": "main"
    },
    {
      "id": "PF-FPIPS-05",
      "action": "REPLACE",
      "existing": "Can I trade news events at FundingPips?",
      "q": "Can I trade news on FundingPips?",
      "html": "It depends on the model and stage. On 1 Step Flex, 2 Step Standard, 2 Step Flex and 2 Step Pro, you may hold trades through news during evaluation, but <a href=\"https://help.fundingpips.com/hc/en-us/articles/34504137479441-News-Trading-Weekend-Holding\">purposely trading news is prohibited</a> in both evaluation and Master stages. On the Master Account, profits from trades opened or closed from 5 minutes before to 5 minutes after restricted high-impact news, or 10 minutes around speeches, may be deducted. Trades opened 5 or more hours earlier are exempt. FundingPips Zero bans news trading entirely. The official source is the dashboard Economic Calendar.",
      "text": "It depends on the model and stage. On 1 Step Flex, 2 Step Standard, 2 Step Flex and 2 Step Pro, you may hold trades through news during evaluation, but purposely trading news is prohibited in both evaluation and Master stages. On the Master Account, profits from trades opened or closed from 5 minutes before to 5 minutes after restricted high-impact news, or 10 minutes around speeches, may be deducted. Trades opened 5 or more hours earlier are exempt. FundingPips Zero bans news trading entirely. The official source is the dashboard Economic Calendar.",
      "group": "main"
    },
    {
      "id": "PF-FPIPS-06",
      "action": "ADD",
      "q": "On FundingPips, if I close a losing trade and re-enter right away, is it counted as a new trade?",
      "html": "Not under <a href=\"https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard\">the Striking System</a> on a 2 Step Standard Master Account with the Monthly reward cycle. There, losses on one trade idea are added together, and a trade idea includes two or more new trades opened within 10 minutes of closing a losing trade. A warning comes when closed and floating loss on one idea reaches 1% of the account size. Warnings are cumulative: the second halves the split, the third cuts it to 20%, and the fourth breaches the account. Check your own model page, since the rule is tied to the Monthly cycle.",
      "text": "Not under the Striking System on a 2 Step Standard Master Account with the Monthly reward cycle. There, losses on one trade idea are added together, and a trade idea includes two or more new trades opened within 10 minutes of closing a losing trade. A warning comes when closed and floating loss on one idea reaches 1% of the account size. Warnings are cumulative: the second halves the split, the third cuts it to 20%, and the fourth breaches the account. Check your own model page, since the rule is tied to the Monthly cycle.",
      "group": "main"
    },
    {
      "id": "PF-FPIPS-07",
      "action": "REPLACE",
      "existing": "What are the contract/lot size limits at FundingPips?",
      "q": "Is there a lot size limit on FundingPips, and why does my margin jump on gold and indices?",
      "html": "<a href=\"https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard\">FundingPips enforces a hard 20-lot limit per click</a> on every trade, and crypto has a separate 1-lot limit per click. On 2 Step Standard, base leverage is 1:100 on forex, 1:30 on metals and 1:20 on indices. Master Accounts also use temporary dynamic leverage on metals, indices and energies: the first 0.05 lots get 1:50, and leverage steps down through 1:30, 1:25, 1:20 and 1:10 until volume above 0.50 lots uses 1:5. Each tier applies only to the volume inside it, so larger positions need more margin.",
      "text": "FundingPips enforces a hard 20-lot limit per click on every trade, and crypto has a separate 1-lot limit per click. On 2 Step Standard, base leverage is 1:100 on forex, 1:30 on metals and 1:20 on indices. Master Accounts also use temporary dynamic leverage on metals, indices and energies: the first 0.05 lots get 1:50, and leverage steps down through 1:30, 1:25, 1:20 and 1:10 until volume above 0.50 lots uses 1:5. Each tier applies only to the volume inside it, so larger positions need more margin.",
      "group": "main"
    },
    {
      "id": "PF-FPIPS-08",
      "action": "CHECK",
      "existing": "Does FundingPips have a consistency rule?",
      "q": "What is the FundingPips consistency score, and why can't I request a reward?",
      "html": "On 2 Step Standard, <a href=\"https://help.fundingpips.com/hc/en-us/articles/34501809112081-2-Step-Standard\">the 35% consistency score applies only to the On Demand and Monthly reward cycles</a>. No single trading day may account for more than 35% of total profit; if your best day is above that, reward requests are blocked until the score comes back down. The fix is to keep trading with days smaller than your best day so total profit grows. Weekly and Bi-Weekly cycles are not subject to the 35% rule. On the Monthly cycle you also need 7 profitable days of at least 0.5%.",
      "text": "On 2 Step Standard, the 35% consistency score applies only to the On Demand and Monthly reward cycles. No single trading day may account for more than 35% of total profit; if your best day is above that, reward requests are blocked until the score comes back down. The fix is to keep trading with days smaller than your best day so total profit grows. Weekly and Bi-Weekly cycles are not subject to the 35% rule. On the Monthly cycle you also need 7 profitable days of at least 0.5%.",
      "group": "main"
    },
    {
      "id": "PF-FPIPS-09",
      "action": "CHECK",
      "existing": "How often can I request payouts at FundingPips?",
      "q": "How long do FundingPips payouts take, and when is KYC required?",
      "html": "<a href=\"https://help.fundingpips.com/hc/en-us/articles/34504564970385-Reward-Methods\">FundingPips processes reward requests within 1 to 3 working days</a>, excluding weekends, plus 1 to 2 more working days for funds to arrive. Before requesting, close all trades and pending orders and wait at least 15 minutes. Rewards go only to accounts in your own name. KYC comes earlier, as the first step of <a href=\"https://help.fundingpips.com/hc/en-us/articles/48636294148497-Master-Account-Setup\">Master Account setup</a> after you pass: it is automated, usually takes a few minutes, and needs a government ID, a selfie and proof of address. Only one verified account is allowed per trader.",
      "text": "FundingPips processes reward requests within 1 to 3 working days, excluding weekends, plus 1 to 2 more working days for funds to arrive. Before requesting, close all trades and pending orders and wait at least 15 minutes. Rewards go only to accounts in your own name. KYC comes earlier, as the first step of Master Account setup after you pass: it is automated, usually takes a few minutes, and needs a government ID, a selfie and proof of address. Only one verified account is allowed per trader.",
      "group": "main"
    }
  ],
  "goat-funded-trader": [
    {
      "id": "PF-GOAT-01",
      "action": "CHECK",
      "existing": "Can I automate Goat Funded Trader with TradingView via PickMyTrade?",
      "q": "Can I use an EA on Goat Funded Trader?",
      "html": "Yes, with conditions. <a href=\"https://help.goatfundedtrader.com/en/articles/10749630-can-i-use-expert-advisors-eas\">Goat Funded Trader allows EAs</a> that follow its prohibited trading practices rule, but bans high-frequency trading systems and Gold Arbitrage EAs. <a href=\"https://help.goatfundedtrader.com/en/articles/10742118-what-are-prohibited-trading-practices\">Its prohibited list</a> also bans third-party, off-the-shelf or pass-the-challenge EAs, and GFT may ask you to show the code to prove the EA is yours. You cannot use an EA to pass the evaluation and then trade manually when funded, or the reverse. If your EA needs a VPS, check your account type, because VPS use is banned on several models.",
      "text": "Yes, with conditions. Goat Funded Trader allows EAs that follow its prohibited trading practices rule, but bans high-frequency trading systems and Gold Arbitrage EAs. Its prohibited list also bans third-party, off-the-shelf or pass-the-challenge EAs, and GFT may ask you to show the code to prove the EA is yours. You cannot use an EA to pass the evaluation and then trade manually when funded, or the reverse. If your EA needs a VPS, check your account type, because VPS use is banned on several models.",
      "group": "main"
    },
    {
      "id": "PF-GOAT-02",
      "action": "ADD",
      "q": "Which Goat Funded Trader accounts allow a VPS?",
      "html": "For accounts purchased from August 12, 2026 onwards, <a href=\"https://help.goatfundedtrader.com/en/articles/10742103-ip-address-and-account-access-policy\">Goat Funded Trader strictly prohibits a VPS</a> on One Step, Two Step, Instant Premium and Pay Later accounts. A VPS is still permitted on Instant GOAT and Instant Hero. Accounts purchased before August 12, 2026 are not affected by this restriction. If your EA depends on a VPS and your account type is on the banned list, you cannot run that EA there. Breaking the access policy can lead to breaches, payout rejection or permanent exclusion.",
      "text": "For accounts purchased from August 12, 2026 onwards, Goat Funded Trader strictly prohibits a VPS on One Step, Two Step, Instant Premium and Pay Later accounts. A VPS is still permitted on Instant GOAT and Instant Hero. Accounts purchased before August 12, 2026 are not affected by this restriction. If your EA depends on a VPS and your account type is on the banned list, you cannot run that EA there. Breaking the access policy can lead to breaches, payout rejection or permanent exclusion.",
      "group": "main"
    },
    {
      "id": "PF-GOAT-03",
      "action": "ADD",
      "q": "Can I use a VPN on Goat Funded Trader, and what happens if my IP changes or I travel?",
      "html": "<a href=\"https://help.goatfundedtrader.com/en/articles/10742103-ip-address-and-account-access-policy\">A VPN is allowed on Goat Funded Trader</a>, but if the Risk Team sees unusual or inconsistent login locations, it may ask for proof of the VPN service. The region you buy from and the region you trade the funded account from should stay reasonably consistent. If you plan to trade from another country, GFT recommends telling support in advance. It may request travel tickets, passport stamps or video verification. <a href=\"https://help.goatfundedtrader.com/en/articles/12921537-shared-device-usage\">Shared devices are strictly prohibited</a>, and repeated unexplained IP changes can trigger a full investigation.",
      "text": "A VPN is allowed on Goat Funded Trader, but if the Risk Team sees unusual or inconsistent login locations, it may ask for proof of the VPN service. The region you buy from and the region you trade the funded account from should stay reasonably consistent. If you plan to trade from another country, GFT recommends telling support in advance. It may request travel tickets, passport stamps or video verification. Shared devices are strictly prohibited, and repeated unexplained IP changes can trigger a full investigation.",
      "group": "main"
    },
    {
      "id": "PF-GOAT-04",
      "action": "REPLACE",
      "existing": "Does Goat Funded Trader allow copy trading?",
      "q": "Can I copy trades between my own Goat Funded Trader accounts?",
      "html": "Only between funded accounts. <a href=\"https://help.goatfundedtrader.com/en/articles/15945071-using-signals\">Goat Funded Trader says copy trading between funded accounts is allowed</a>, but copying from one evaluation account to another, or from an evaluation account to a funded account, is not. Its <a href=\"https://help.goatfundedtrader.com/en/articles/10742118-what-are-prohibited-trading-practices\">prohibited practices</a> add that you cannot duplicate trades, whether manually or by EA, and that this covers both the trades and the trade ideas. Copying from signal providers, trading groups, third-party services or other traders is prohibited on every account. GFT suggests contacting support if you are unsure about a specific service.",
      "text": "Only between funded accounts. Goat Funded Trader says copy trading between funded accounts is allowed, but copying from one evaluation account to another, or from an evaluation account to a funded account, is not. Its prohibited practices add that you cannot duplicate trades, whether manually or by EA, and that this covers both the trades and the trade ideas. Copying from signal providers, trading groups, third-party services or other traders is prohibited on every account. GFT suggests contacting support if you are unsure about a specific service.",
      "group": "main"
    },
    {
      "id": "PF-GOAT-05",
      "action": "CHECK",
      "existing": "Does Goat Funded Trader allow copy trading?",
      "q": "If I trade a popular strategy I learned on Twitter, will Goat Funded Trader flag me for copy trading?",
      "html": "Goat Funded Trader's written rule targets copying trades, not learning a method. <a href=\"https://help.goatfundedtrader.com/en/articles/15945071-using-signals\">Its signals policy</a> prohibits copying trades from signal providers, trading groups, third-party services or other traders, and says all trading decisions must be made independently, based on your own analysis and judgment. The help center does not say how it separates two traders using the same public strategy from coordinated copying. If you are unsure whether something you follow counts as a signal service, GFT asks you to contact support before using it.",
      "text": "Goat Funded Trader's written rule targets copying trades, not learning a method. Its signals policy prohibits copying trades from signal providers, trading groups, third-party services or other traders, and says all trading decisions must be made independently, based on your own analysis and judgment. The help center does not say how it separates two traders using the same public strategy from coordinated copying. If you are unsure whether something you follow counts as a signal service, GFT asks you to contact support before using it.",
      "group": "main"
    },
    {
      "id": "PF-GOAT-06",
      "action": "ADD",
      "q": "Is it hedging on Goat Funded Trader if I buy NAS100 and sell XAUUSD at the same time?",
      "html": "<a href=\"https://help.goatfundedtrader.com/en/articles/10742101-is-hedging-allowed\">Goat Funded Trader defines hedging</a> as opening two opposite positions on the same asset, regardless of lot size or calculated risk. By that written definition, a NAS100 buy and an XAUUSD sell are different assets, and the page does not mention correlated instruments. Same-asset hedging is strictly prohibited everywhere: within one account, across your own accounts, with other traders, and with another firm's account. Hedging against an external firm leads to an immediate breach and a permanent ban. If your two trades are meant to offset each other, ask support first.",
      "text": "Goat Funded Trader defines hedging as opening two opposite positions on the same asset, regardless of lot size or calculated risk. By that written definition, a NAS100 buy and an XAUUSD sell are different assets, and the page does not mention correlated instruments. Same-asset hedging is strictly prohibited everywhere: within one account, across your own accounts, with other traders, and with another firm's account. Hedging against an external firm leads to an immediate breach and a permanent ban. If your two trades are meant to offset each other, ask support first.",
      "group": "main"
    },
    {
      "id": "PF-GOAT-07",
      "action": "ADD",
      "q": "What happens to trades I close in under 2 minutes on a Goat Funded Trader funded account?",
      "html": "On Goat Funded Trader funded accounts, <a href=\"https://help.goatfundedtrader.com/en/articles/12849041-what-is-the-rule-about-trades-lasting-less-than-2-minutes\">profit from any trade open for less than 2 minutes</a> (120 seconds) is treated as invalid and removed when you request a payout, while losses from those trades still count. You may still open and close trades that fast. Removing that profit is not a breach or rule violation; it only lowers the payout amount. The rule does not apply to evaluation accounts. Watch the payout minimum, though: a payout request needs <a href=\"https://help.goatfundedtrader.com/en/articles/10742264-how-payouts-work-eligibility-request-processing-and-arrival\">at least $100</a> of profit.",
      "text": "On Goat Funded Trader funded accounts, profit from any trade open for less than 2 minutes (120 seconds) is treated as invalid and removed when you request a payout, while losses from those trades still count. You may still open and close trades that fast. Removing that profit is not a breach or rule violation; it only lowers the payout amount. The rule does not apply to evaluation accounts. Watch the payout minimum, though: a payout request needs at least $100 of profit.",
      "group": "main"
    },
    {
      "id": "PF-GOAT-08",
      "action": "REPLACE",
      "existing": "Can I trade news events at Goat Funded Trader?",
      "q": "Can I trade news on Goat Funded Trader?",
      "html": "Yes. <a href=\"https://help.goatfundedtrader.com/en/articles/10742084-is-news-trading-allowed\">Goat Funded Trader allows trading during news</a>, but any trade opened or closed within 5 minutes before or after a red-folder high-impact release can make at most 1% of the account's initial balance. That includes trades closed by stop loss, take profit or pending orders. The cap applies to both the challenge and funded phases. Profit above 1% is removed during account review, without a breach or penalty. The Swing challenge account is listed as allowing unrestricted news trading.",
      "text": "Yes. Goat Funded Trader allows trading during news, but any trade opened or closed within 5 minutes before or after a red-folder high-impact release can make at most 1% of the account's initial balance. That includes trades closed by stop loss, take profit or pending orders. The cap applies to both the challenge and funded phases. Profit above 1% is removed during account review, without a breach or penalty. The Swing challenge account is listed as allowing unrestricted news trading.",
      "group": "main"
    },
    {
      "id": "PF-GOAT-09",
      "action": "CHECK",
      "existing": "Does the consistency rule reset after a payout at Goat Funded Trader?",
      "q": "How does the Goat Funded Trader consistency rule work for payouts?",
      "html": "On Goat Funded Trader models that have one, <a href=\"https://help.goatfundedtrader.com/en/articles/15290379-what-is-the-consistency-rule\">no single trading day can make up the set percentage</a> or more of your total profit in the payout period. The percentage differs by model; Instant GOAT and Instant Hero use 15%. With a 15% rule and $5,000 total profit, your best day must stay under $750. Missing it is not a breach; you simply cannot request a payout until your best day falls below the limit, so keep trading with smaller days. Partial closes count on the day each part closes.",
      "text": "On Goat Funded Trader models that have one, no single trading day can make up the set percentage or more of your total profit in the payout period. The percentage differs by model; Instant GOAT and Instant Hero use 15%. With a 15% rule and $5,000 total profit, your best day must stay under $750. Missing it is not a breach; you simply cannot request a payout until your best day falls below the limit, so keep trading with smaller days. Partial closes count on the day each part closes.",
      "group": "main"
    },
    {
      "id": "PF-GOAT-10",
      "action": "CHECK",
      "existing": "How often can I request payouts at Goat Funded Trader?",
      "q": "How long does a Goat Funded Trader payout take, and when do I do KYC?",
      "html": "Goat Funded Trader <a href=\"https://help.goatfundedtrader.com/en/articles/10742264-how-payouts-work-eligibility-request-processing-and-arrival\">processes payout requests within 2 business days</a>, not counting weekends and public holidays, and adds $1,000 if it misses that window, unless the delay comes from pending KYC or a request for more information. <a href=\"https://help.goatfundedtrader.com/en/articles/15949678-identity-verification-kyc-what-to-expect\">KYC and the Trader Agreement</a> happen when you request your first payout, not when you get the funded account, and the 2-day clock starts after verification. The minimum request is $100, each request must be for the full profit, and your payout account must be in your name and unused on any other GFT account.",
      "text": "Goat Funded Trader processes payout requests within 2 business days, not counting weekends and public holidays, and adds $1,000 if it misses that window, unless the delay comes from pending KYC or a request for more information. KYC and the Trader Agreement happen when you request your first payout, not when you get the funded account, and the 2-day clock starts after verification. The minimum request is $100, each request must be for the full profit, and your payout account must be in your name and unused on any other GFT account.",
      "group": "main"
    }
  ],
  "lucid-trading": [
    {
      "id": "PF-LUCID-01",
      "action": "NEW PAGE",
      "q": "At Lucid Trading, is it hedging if I go short MES and long MNQ, or long NQ and short gold?",
      "html": "Not if both positions are in the same account. Lucid's <a href=\"https://support.lucidtrading.com/en/articles/11404734-prohibited-hedging\">hedging page</a> says you can go long and short different contracts in the same account, and even long minis against short micros of the same contract in one account. What it bans is opposing positions across accounts: the same contract in separate accounts, or correlated assets in separate accounts, such as long ES in one account and short NQ in another. Lucid groups correlated assets as equities, metals, energies and so on. Hedging between different users' accounts or different firms is also prohibited.",
      "text": "Not if both positions are in the same account. Lucid's hedging page says you can go long and short different contracts in the same account, and even long minis against short micros of the same contract in one account. What it bans is opposing positions across accounts: the same contract in separate accounts, or correlated assets in separate accounts, such as long ES in one account and short NQ in another. Lucid groups correlated assets as equities, metals, energies and so on. Hedging between different users' accounts or different firms is also prohibited.",
      "group": "main"
    },
    {
      "id": "PF-LUCID-02",
      "action": "NEW PAGE",
      "q": "What happens if Lucid Trading flags my accounts for hedging, for example after a copier mistake?",
      "html": "When flagged, Lucid emails you and resets the associated accounts to the prior day's balance; after repeated offenses, all involved accounts are breached and you may be permanently restricted from Lucid's services. Lucid detects hedging with automated risk systems, and its <a href=\"https://support.lucidtrading.com/en/articles/11404734-prohibited-hedging\">hedging rule</a> covers your own accounts, other users' accounts and accounts at other firms. Live accounts are stricter: Lucid says hedging live accounts is prohibited by both Lucid and the CME, including copier issues, and violations bring a permanent ban. Copier errors are your responsibility, so check that a copier cannot leave opposite positions open across accounts.",
      "text": "When flagged, Lucid emails you and resets the associated accounts to the prior day's balance; after repeated offenses, all involved accounts are breached and you may be permanently restricted from Lucid's services. Lucid detects hedging with automated risk systems, and its hedging rule covers your own accounts, other users' accounts and accounts at other firms. Live accounts are stricter: Lucid says hedging live accounts is prohibited by both Lucid and the CME, including copier issues, and violations bring a permanent ban. Copier errors are your responsibility, so check that a copier cannot leave opposite positions open across accounts.",
      "group": "main"
    },
    {
      "id": "PF-LUCID-03",
      "action": "NEW PAGE",
      "q": "Does Lucid Trading allow bots, algos and trade copiers?",
      "html": "Yes. Lucid's <a href=\"https://support.lucidtrading.com/en/articles/11404728-other-trading-activities\">Other Trading Activities page</a> says automated trading systems and trade copiers are permitted, as long as all automated activity follows Lucid's rules, and you are fully responsible for software errors, malfunctions or unintended outcomes. Two rules matter most for bots. High-frequency trading is prohibited: a first offense brings a written warning, and repeats remove HFT profits and close accounts. Microscalping is flagged when more than 50% of profits come from trades held 5 seconds or less. Copiers also need hedge checks, because opposite positions across accounts are banned.",
      "text": "Yes. Lucid's Other Trading Activities page says automated trading systems and trade copiers are permitted, as long as all automated activity follows Lucid's rules, and you are fully responsible for software errors, malfunctions or unintended outcomes. Two rules matter most for bots. High-frequency trading is prohibited: a first offense brings a written warning, and repeats remove HFT profits and close accounts. Microscalping is flagged when more than 50% of profits come from trades held 5 seconds or less. Copiers also need hedge checks, because opposite positions across accounts are banned.",
      "group": "main"
    },
    {
      "id": "PF-LUCID-04",
      "action": "NEW PAGE",
      "q": "Can I trade CPI, FOMC or other red-folder news at Lucid Trading?",
      "html": "It depends on the plan. On LucidDaily, trading red folder news is a hard breach. On LucidFlex, LucidPro and LucidDirect you may enter or exit positions around scheduled or unscheduled news without it being a breach. Lucid warns that news can bring slippage and velocity logic triggers, and that <a href=\"https://support.lucidtrading.com/en/articles/11404728-other-trading-activities\">traders assume full responsibility</a> for all outcomes when trading during news. Lucid's page does not list which releases count as red folder, so confirm with support before holding a LucidDaily position into a release.",
      "text": "It depends on the plan. On LucidDaily, trading red folder news is a hard breach. On LucidFlex, LucidPro and LucidDirect you may enter or exit positions around scheduled or unscheduled news without it being a breach. Lucid warns that news can bring slippage and velocity logic triggers, and that traders assume full responsibility for all outcomes when trading during news. Lucid's page does not list which releases count as red folder, so confirm with support before holding a LucidDaily position into a release.",
      "group": "main"
    },
    {
      "id": "PF-LUCID-05",
      "action": "NEW PAGE",
      "q": "When can I request a payout on a LucidFlex funded account, and how much?",
      "html": "After 5 profitable days in the payout cycle plus positive net profit for the cycle. The minimum daily profit is $100, $150, $200 or $250 for 25K, 50K, 100K and 150K accounts, and those days reset after every approved payout. Each request is at least $500 and at most 50% of profit, capped at $1,000, $2,000, $2,500 or $3,000 by size. There is no buffer and no fixed payout window, the split is 90/10, and <a href=\"https://support.lucidtrading.com/en/articles/12945796-lucidflex-payouts\">after 5 payouts</a> the account is moved live. Approved payouts are disbursed within 2 business days.",
      "text": "After 5 profitable days in the payout cycle plus positive net profit for the cycle. The minimum daily profit is $100, $150, $200 or $250 for 25K, 50K, 100K and 150K accounts, and those days reset after every approved payout. Each request is at least $500 and at most 50% of profit, capped at $1,000, $2,000, $2,500 or $3,000 by size. There is no buffer and no fixed payout window, the split is 90/10, and after 5 payouts the account is moved live. Approved payouts are disbursed within 2 business days.",
      "group": "main"
    },
    {
      "id": "PF-LUCID-06",
      "action": "NEW PAGE",
      "q": "Does Lucid Trading have a consistency rule?",
      "html": "It depends on the account. A LucidFlex evaluation needs a consistency percentage of 50% or less to upgrade, measured as largest single-day profit divided by account profit, with a small built-in cushion so you can pass in two days; <a href=\"https://support.lucidtrading.com/en/articles/12945795-lucidflex-funded-account\">LucidFlex funded accounts</a> have no consistency rule. LucidPro funded accounts need 40% or less to request a payout, reset after each payout, or 35% for accounts bought or reset before 28 Nov 2025. Live accounts have no consistency requirement on any plan. Going over does not fail a Flex evaluation; you keep trading until your largest day is 50% or less.",
      "text": "It depends on the account. A LucidFlex evaluation needs a consistency percentage of 50% or less to upgrade, measured as largest single-day profit divided by account profit, with a small built-in cushion so you can pass in two days; LucidFlex funded accounts have no consistency rule. LucidPro funded accounts need 40% or less to request a payout, reset after each payout, or 35% for accounts bought or reset before 28 Nov 2025. Live accounts have no consistency requirement on any plan. Going over does not fail a Flex evaluation; you keep trading until your largest day is 50% or less.",
      "group": "main"
    },
    {
      "id": "PF-LUCID-07",
      "action": "NEW PAGE",
      "q": "Is Lucid Trading's drawdown end-of-day or intraday, and does hitting the daily loss limit blow the account?",
      "html": "LucidFlex and LucidPro use an <a href=\"https://support.lucidtrading.com/en/articles/12945815-lucidflex-drawdown\">end-of-day drawdown</a>: the Max Loss Limit rises with your highest closing balance and locks at the starting balance plus $100 once you pass the Initial Trail Balance, for example $50,100 on a 50K. If your balance reaches the MLL, the account is breached. Daily Loss Limits are soft breaches: hitting one stops trading until the next session but does not cost you the account unless the MLL is also hit. The DLL is optional on LucidFlex and fixed on a LucidPro evaluation, for example $1,200 on a 50K.",
      "text": "LucidFlex and LucidPro use an end-of-day drawdown: the Max Loss Limit rises with your highest closing balance and locks at the starting balance plus $100 once you pass the Initial Trail Balance, for example $50,100 on a 50K. If your balance reaches the MLL, the account is breached. Daily Loss Limits are soft breaches: hitting one stops trading until the next session but does not cost you the account unless the MLL is also hit. The DLL is optional on LucidFlex and fixed on a LucidPro evaluation, for example $1,200 on a 50K.",
      "group": "main"
    },
    {
      "id": "PF-LUCID-08",
      "action": "NEW PAGE",
      "q": "When does Lucid Trading move me to a live account, and can I stay in sim?",
      "html": "Lucid's risk team decides. You enter the live review pool after your fifth and final payout on Flex, Pro or Direct, after a large lifetime payout total, after hitting the LucidDaily maximum daily profit, or for exceptional sim performance. Each funded account with at least one payout becomes a live account starting at $0, with daily payouts, end-of-day drawdown and no daily loss limit, and your other simulated accounts are closed. If you are not ready, Lucid offers a <a href=\"https://support.lucidtrading.com/en/articles/16558826-new-live-structure\">cashout</a> equal to 50% of your live starting balance. After blowing a live account, the standard cooldown before buying a new evaluation is 2 weeks.",
      "text": "Lucid's risk team decides. You enter the live review pool after your fifth and final payout on Flex, Pro or Direct, after a large lifetime payout total, after hitting the LucidDaily maximum daily profit, or for exceptional sim performance. Each funded account with at least one payout becomes a live account starting at $0, with daily payouts, end-of-day drawdown and no daily loss limit, and your other simulated accounts are closed. If you are not ready, Lucid offers a cashout equal to 50% of your live starting balance. After blowing a live account, the standard cooldown before buying a new evaluation is 2 weeks.",
      "group": "main"
    },
    {
      "id": "PF-LUCID-09",
      "action": "NEW PAGE",
      "q": "How many accounts can I have at Lucid Trading?",
      "html": "Up to 10 in total per household or family, across evaluations and funded accounts, with no more than 5 funded. Lucid's <a href=\"https://support.lucidtrading.com/en/articles/11404617-maximum-number-of-accounts\">account limits page</a> gives the example that holding 5 evaluations leaves room for 5 funded accounts, and different funded types share the cap, so 3 LucidDirect accounts leave room for 2 LucidPro funded accounts. You can keep 5 evaluations in reserve while holding 5 funded accounts and still trade them. LucidLive is capped at 5 per household, and once anyone in a household trades live, others there may not trade simulated accounts.",
      "text": "Up to 10 in total per household or family, across evaluations and funded accounts, with no more than 5 funded. Lucid's account limits page gives the example that holding 5 evaluations leaves room for 5 funded accounts, and different funded types share the cap, so 3 LucidDirect accounts leave room for 2 LucidPro funded accounts. You can keep 5 evaluations in reserve while holding 5 funded accounts and still trade them. LucidLive is capped at 5 per household, and once anyone in a household trades live, others there may not trade simulated accounts.",
      "group": "main"
    },
    {
      "id": "PF-LUCID-10",
      "action": "NEW PAGE",
      "q": "Can I trade full size from day one in a LucidFlex funded account?",
      "html": "No. The LucidFlex <a href=\"https://support.lucidtrading.com/en/articles/12945808-lucidflex-scaling-plan\">scaling plan</a> ties your contract limit to simulated profit in the funded account and updates only at the end of each session. A 50K Flex funded account allows 2 minis or 20 micros below $1,000 profit, 3 minis from $1,000 and 4 minis from $2,000. Payouts lower your profit, so your tier can drop. The evaluation has no scaling plan, so there you get full size, 4 minis or 40 micros on a 50K. Intentionally getting around the limits can get your profit for the day wiped.",
      "text": "No. The LucidFlex scaling plan ties your contract limit to simulated profit in the funded account and updates only at the end of each session. A 50K Flex funded account allows 2 minis or 20 micros below $1,000 profit, 3 minis from $1,000 and 4 minis from $2,000. Payouts lower your profit, so your tier can drop. The evaluation has no scaling plan, so there you get full size, 4 minis or 40 micros on a 50K. Intentionally getting around the limits can get your profit for the day wiped.",
      "group": "main"
    }
  ],
  "rebelsfunding": [
    {
      "id": "PF-REBELS-01",
      "action": "NEW PAGE",
      "q": "Can I use an EA or a trading bot on RebelsFunding?",
      "html": "No. <a href=\"https://www.rebelsfunding.com/faq/\">RebelsFunding says</a> EAs, automated trading robots and other systems that place or manage trades automatically are not supported on paid Evaluation or RCF accounts, its name for the funded stage. Trading happens on its own RF-Trader platform, which runs in a browser with TradingView charts and is not MetaTrader, cTrader or a retail brokerage account. Reasonable manual trading styles are allowed if they follow the <a href=\"https://www.rebelsfunding.com/all-the-rules/\">program rules</a>. The same automation rule appears in the Copper, Bronze, Silver, Gold and Diamond program rules.",
      "text": "No. RebelsFunding says EAs, automated trading robots and other systems that place or manage trades automatically are not supported on paid Evaluation or RCF accounts, its name for the funded stage. Trading happens on its own RF-Trader platform, which runs in a browser with TradingView charts and is not MetaTrader, cTrader or a retail brokerage account. Reasonable manual trading styles are allowed if they follow the program rules. The same automation rule appears in the Copper, Bronze, Silver, Gold and Diamond program rules.",
      "group": "main"
    },
    {
      "id": "PF-REBELS-02",
      "action": "NEW PAGE",
      "q": "Can I use a trade copier to run my strategy on several RebelsFunding accounts?",
      "html": "Not with an automated copier. <a href=\"https://www.rebelsfunding.com/all-the-rules/\">RebelsFunding's rules</a> do not use the words copy trading, but they state that systems that place or manage trades automatically are not supported on paid Evaluation or RCF accounts, and a trade copier places trades automatically. Each account must be traded personally by the registered trader, and coordinated hedging between accounts, persons or other firms is prohibited. You may hold several RCF accounts, up to 640,000 USD in total active allocation. The rules do not address placing the same trade by hand on each account.",
      "text": "Not with an automated copier. RebelsFunding's rules do not use the words copy trading, but they state that systems that place or manage trades automatically are not supported on paid Evaluation or RCF accounts, and a trade copier places trades automatically. Each account must be traded personally by the registered trader, and coordinated hedging between accounts, persons or other firms is prohibited. You may hold several RCF accounts, up to 640,000 USD in total active allocation. The rules do not address placing the same trade by hand on each account.",
      "group": "main"
    },
    {
      "id": "PF-REBELS-03",
      "action": "NEW PAGE",
      "q": "Is martingale or doubling down allowed on RebelsFunding?",
      "html": "No. <a href=\"https://www.rebelsfunding.com/faq/\">RebelsFunding lists martingale</a>, one-sided position multiplication, excessive exposure and gambling-style trading as prohibited practices in its program rules and FAQ. Artificially splitting trades or volume to get around the trade-count or risk rules is also prohibited. Its rules also say that several entries in the same direction during one market move, or one position split into smaller parts, <a href=\"https://www.rebelsfunding.com/all-the-rules/\">count as a single real trade</a>, so stacking entries does not create new trades.",
      "text": "No. RebelsFunding lists martingale, one-sided position multiplication, excessive exposure and gambling-style trading as prohibited practices in its program rules and FAQ. Artificially splitting trades or volume to get around the trade-count or risk rules is also prohibited. Its rules also say that several entries in the same direction during one market move, or one position split into smaller parts, count as a single real trade, so stacking entries does not create new trades.",
      "group": "main"
    },
    {
      "id": "PF-REBELS-04",
      "action": "NEW PAGE",
      "q": "What is the 1.5% risk rule on RebelsFunding, and do re-entries count separately?",
      "html": "<a href=\"https://www.rebelsfunding.com/faq/\">On a RebelsFunding RCF account</a>, the risk on one trade or one group of related trades must not exceed 1.5% of the balance when the first trade in the group was opened. A related group can include split entries, gradual additions, positions on the same symbol, strongly correlated instruments or trades built around the same market idea, so re-entering the same idea is counted with it. If you trade without a stop loss, the rule is judged on the highest floating or realized loss. RebelsFunding recommends risking about 0.5% per trade or group.",
      "text": "On a RebelsFunding RCF account, the risk on one trade or one group of related trades must not exceed 1.5% of the balance when the first trade in the group was opened. A related group can include split entries, gradual additions, positions on the same symbol, strongly correlated instruments or trades built around the same market idea, so re-entering the same idea is counted with it. If you trade without a stop loss, the rule is judged on the highest floating or realized loss. RebelsFunding recommends risking about 0.5% per trade or group.",
      "group": "main"
    },
    {
      "id": "PF-REBELS-05",
      "action": "NEW PAGE",
      "q": "Is there a minimum time I must hold a trade on RebelsFunding?",
      "html": "Yes. On a paid RebelsFunding Evaluation, <a href=\"https://www.rebelsfunding.com/all-the-rules/\">every trade used as part of a strategy must stay open for at least 30 seconds</a>; one accidental close may be reviewed in context, but repeated or deliberate sub-30-second trading is not allowed. On an RCF account, every trade must remain open for <a href=\"https://www.rebelsfunding.com/faq/\">at least 60 seconds</a>. There is no minimum number of trades before an RCF reward request, but each Evaluation phase needs a set number of real trades, such as 4 per phase on the Copper program.",
      "text": "Yes. On a paid RebelsFunding Evaluation, every trade used as part of a strategy must stay open for at least 30 seconds; one accidental close may be reviewed in context, but repeated or deliberate sub-30-second trading is not allowed. On an RCF account, every trade must remain open for at least 60 seconds. There is no minimum number of trades before an RCF reward request, but each Evaluation phase needs a set number of real trades, such as 4 per phase on the Copper program.",
      "group": "main"
    },
    {
      "id": "PF-REBELS-06",
      "action": "NEW PAGE",
      "q": "Can I trade news on RebelsFunding?",
      "html": "On a paid RebelsFunding Evaluation, <a href=\"https://www.rebelsfunding.com/all-the-rules/\">news trading is allowed</a>, and you carry the risk of wider spreads, gaps and slippage. On an RCF account, no new trade or pending order may be opened or activated in the 5 minutes immediately before a red high-impact event on the TradingView economic calendar inside RF-Trader or the Client Zone. Existing positions may be held, managed or closed, and there is no fixed restriction after the release. Deliberately exploiting news gaps or delayed pricing remains prohibited.",
      "text": "On a paid RebelsFunding Evaluation, news trading is allowed, and you carry the risk of wider spreads, gaps and slippage. On an RCF account, no new trade or pending order may be opened or activated in the 5 minutes immediately before a red high-impact event on the TradingView economic calendar inside RF-Trader or the Client Zone. Existing positions may be held, managed or closed, and there is no fixed restriction after the release. Deliberately exploiting news gaps or delayed pricing remains prohibited.",
      "group": "main"
    },
    {
      "id": "PF-REBELS-07",
      "action": "NEW PAGE",
      "q": "Does RebelsFunding warn me before I hit the daily or overall drawdown?",
      "html": "<a href=\"https://www.rebelsfunding.com/faq/\">RebelsFunding's rules and FAQ</a> describe no warning step. When the Daily or Overall Drawdown is breached, open positions close automatically, the account switches to read-only, and the Evaluation phase or RCF account is terminated; the FAQ calls this a final account event, not a temporary daily pause. RF-Trader displays your equity and drawdown information, so watch it yourself. Daily Drawdown is measured from the equity snapshot at the daily rollover, 21:00 UTC in summer and 22:00 UTC in winter, and both limits include floating profit or loss.",
      "text": "RebelsFunding's rules and FAQ describe no warning step. When the Daily or Overall Drawdown is breached, open positions close automatically, the account switches to read-only, and the Evaluation phase or RCF account is terminated; the FAQ calls this a final account event, not a temporary daily pause. RF-Trader displays your equity and drawdown information, so watch it yourself. Daily Drawdown is measured from the equity snapshot at the daily rollover, 21:00 UTC in summer and 22:00 UTC in winter, and both limits include floating profit or loss.",
      "group": "main"
    },
    {
      "id": "PF-REBELS-08",
      "action": "NEW PAGE",
      "q": "When can I request my first RebelsFunding payout, and what is the minimum?",
      "html": "On RebelsFunding, <a href=\"https://www.rebelsfunding.com/faq/\">the first reward request on an RCF account</a> can be made no earlier than 14 calendar days after the first trade on that account, counted separately for each account. The minimum request is 50 USD, all positions must be closed first, and a terminated account cannot request a reward. Rewards are paid through the methods offered at the time, which may include RiseWorks, a supported cryptocurrency or bank transfer, and may require identity, tax or billing details. The starting reward split is 80% on Copper and Bronze and 75% on Silver and Gold.",
      "text": "On RebelsFunding, the first reward request on an RCF account can be made no earlier than 14 calendar days after the first trade on that account, counted separately for each account. The minimum request is 50 USD, all positions must be closed first, and a terminated account cannot request a reward. Rewards are paid through the methods offered at the time, which may include RiseWorks, a supported cryptocurrency or bank transfer, and may require identity, tax or billing details. The starting reward split is 80% on Copper and Bronze and 75% on Silver and Gold.",
      "group": "main"
    },
    {
      "id": "PF-REBELS-09",
      "action": "NEW PAGE",
      "q": "When do I do KYC on RebelsFunding? Does passing the Evaluation mean I am funded?",
      "html": "On RebelsFunding, <a href=\"https://www.rebelsfunding.com/faq/\">passing the Evaluation only makes you eligible for a separate RCF assessment</a>; an RCF account is not granted automatically. The next steps can include account and strategy review, identity verification, KYC/AML and sanctions screening, jurisdiction checks, approval, and signing an RCF Account Contract with RIFM, s.r.o. and FRCSM, s.r.o. The RCF account is created only after all of these are done. The official pages do not say whether KYC must be repeated for every program you pass.",
      "text": "On RebelsFunding, passing the Evaluation only makes you eligible for a separate RCF assessment; an RCF account is not granted automatically. The next steps can include account and strategy review, identity verification, KYC/AML and sanctions screening, jurisdiction checks, approval, and signing an RCF Account Contract with RIFM, s.r.o. and FRCSM, s.r.o. The RCF account is created only after all of these are done. The official pages do not say whether KYC must be repeated for every program you pass.",
      "group": "main"
    }
  ]
};
