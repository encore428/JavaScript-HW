# Submission
Submitted: 2021-08-01<br>
Objects: pricing.js<br>
URL: https://codesandbox.io/s/intro-to-js-playground-forked-y29v8?file=/public/javascripts/pricing.js

The java script has two immediately invoked functions:

initPricing():
1.	Loads list of tiers from api/pricing and JSON parse into object.
1.	Looks for div of id priceList in DOM.
1.	Wipe out the contents of the div, and rebuild with loaded tiers.
1.	When building the contents, both monthly and  yearly prices are loaded from JSON parsed object and rendered onto the page hidden, and assigned one of two classes pricemth and priceyly accordingly (see initButtons() function  descriptions for usage).
1.	For the list under WHAT’S INCLUDED, it is built base on JSON data, and could have been loaded together with api/pricing.  However, as the data has not been made available via api, it is hardcoded in the script with details as reflected in the original pricing.html.
1.	If the WHAT’S INCLUDED detail is made available via api in future, the script can be easily modified by replacing the hardcode with a fetch and a parse.
1.	Because div priceList is wipe out and rebuilt in the script, the corresponding contents in pricing.html can be optionally removed.

initButtons():
1.	Add eventListener to each of the monthly and yearly pricing buttons.
1.	The event listener checks which button has been clicked.
1.	If monthly billing button is clicked, elements of class pricemth are un-hidden while elements of class priceyly are hidden, and the opposite if yearly button is clicked.
1.	The event listener also toggles the bg-color of the button accordingly.


# Take Home Homework (Day 4)

Visit “Pricing” page (/pricing).

Add code in public/javascripts/pricing.js so that:
1. The price displayed in the page will be according to the data retrieved from /api/pricing.
1. When the “Monthly billing” and “Yearly billing” button are clicked:
a. the price unit will be updated (“/mo” for monthly and “/yr” for yearly).
a. the price for each tier should be updated as well.

Reference:
- Learn about Array .find method in this article.


