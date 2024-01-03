import { onRequest } from "firebase-functions/v2/https";
import Razorpay from "razorpay";

import { setGlobalOptions } from "firebase-functions/v2";

// Set the maximum instances to 10 for all functions
setGlobalOptions({ maxInstances: 10 });

export const createSubscriptionEndpoint = onRequest(
	{ cors: [/firebase\.com$/, "flutter.com"] },
	(request, response) => {
		const data = request.body;

		let instance = new Razorpay({
			key_id: "rzp_test_4ccVy8XWO55jeT",
			key_secret: "Y3Qsfnk4J1N08lC6cJKPqYk4",
		});

		instance.subscriptions
			.create({
				plan_id: String(data.planId),
				customer_notify: 0,
				quantity: 1,
				total_count: 24,
			})
			.then((res) => {
				response.send({
					subscriptionId: res.id,
				});
			})
			.catch((error) => {
				response.send(error);
			});
	},
);
