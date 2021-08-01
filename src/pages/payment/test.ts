// Execute this cmd to create a test user:
// curl -X POST \
// -H "Content-Type: application/json" \
// -H 'Authorization: Bearer PROD_ACCESS_TOKEN' \
// "https://api.mercadopago.com/users/test_user" \
// -d '{"site_id":"MLB"}'

// 23/08/2021:
export const testBuyer = {
	id: 796069878,
	nickname: "TESTWGUKQ0IV",
	password: "qatest6861",
	site_status: "active",
	email: "test_user_57103565@testuser.com",
};

export const testUser = {
	id: 796164744,
	nickname: "TETE3766293",
	password: "qatest2501",
	site_status: "active",
	email: "test_user_96829277@testuser.com",
};
