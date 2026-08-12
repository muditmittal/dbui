---
source: wcag22
title: WCAG 2.2 and Understanding WCAG 2.2
url: https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data
license: W3C Document License
bucket: A-verbatim
sha: 5841658f8a3f18c6d058ac4cfcdbdfdd6076e64f
retrieved: 2026-08-11
---
# Understanding Error Prevention (Legal, Financial, Data)

## In brief

**Goal** — Users can avoid submitting incorrect important information.

**What to do** — Provide ways for users to confirm, correct, or reverse important submissions.

**Why it's important** — People with disabilities may be more likely to make mistakes, or not notice them.

## Intent of Error Prevention (Legal, Financial, Data)

The intent of this success criterion is to help users with disabilities avoid serious
consequences as the result of a mistake when performing an action that cannot be reversed.
For example, purchasing non-refundable airline tickets or submitting an order to purchase
stock in a brokerage account are financial transactions with serious consequences.
If users have made a mistake on the date of air travel, they could end up with
a ticket for the wrong day that cannot be exchanged. If users made a mistake on
the number of stock shares to be purchased, they could end up purchasing more
stock than intended. Both of these types of mistakes involve transactions that take
place immediately and cannot be altered afterwards, and can be very costly. Likewise,
it may be an unrecoverable error if users unintentionally modify or delete data stored
in a database that they later need to access, such as their entire travel profile
in a travel services website. When referring to modification or deletion of 'user
controllable' data, the intent is to prevent mass loss of data such as deleting a
file or record. It is not the intent to require a confirmation for each save command
or the simple creation or editing of documents, records or other data.

Users with disabilities may be more likely to make mistakes. People with reading disabilities
may transpose numbers and letters, and those with motor disabilities may hit keys
by mistake. Providing the ability to reverse actions allows users to correct a mistake
that could result in serious consequences. Providing the ability to review and correct
information gives the user an opportunity to detect a mistake before taking an action
that has serious consequences.

User-controllable data is user-viewable data that the user can change and/or delete
through an intentional action. Examples of the user controlling such data would be
updating the phone number and address for the user's account, or deleting a record
of past invoices from a website. It does not refer such things as internet logs and
search engine monitoring data that the user can't view or interact with directly.

## Benefits of Error Prevention (Legal, Financial, Data)

- Providing safeguards to avoid serious consequences resulting from mistakes helps users
with all disabilities who may be more likely to make mistakes.

## Examples of Error Prevention (Legal, Financial, Data)

**Order confirmation** —
A web retailer offers on-line shopping for customers. When an order is submitted,
the order information—including items ordered, quantity of each ordered item, shipping
address, and payment method—are displayed so that the user can inspect the order for
correctness. The user can either confirm the order or make changes.

**Stock sale** —
A financial services website lets users buy and sell stock online. When a user submits
an order to buy or sell stock, the system checks to see whether or not the market
is open. If it is after hours, the user is alerted that the transaction will be an
after-hours transaction, is told about the risks of trading outside of regular market
hours, and given the opportunity to cancel or confirm the order.

## Resources for Error Prevention (Legal, Financial, Data)

{% # Data for associated techniques is defined in understanding/understanding.11tydata.js %}
{% include "understanding/techniques.html" %}
