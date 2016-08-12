/**
 * Codes used in edit/display of payment methods
 * @type {Object}
 */
var PAYMENT_METHOD_CODES = {
    'VI': 'Visa',
    'MC': 'MasterCard',
    'CR': 'Credit',
    'DB': 'Debit',
    'CHK': 'Checking',
    'SAV': 'Savings'
};
AUTO_PAYMENT_MODES = {
	setup: "00",
	edit: "01",
	remove: "99"
}
USER_TYPES = {
	customer: '0001',
	agent: '0002',
	csr: '0003',
	superCsr: '0999'
}

PAY_METHOD_TYPES = {
	checkingSavingBank: 'L',
	creditCard: 'R',
	debitCard: 'O'
}
