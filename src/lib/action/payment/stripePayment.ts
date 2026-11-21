import { env } from "@/config/env-config";
import type {
    APIResponse,
    CreatePaymentPayload,
    CreatePaymentResponse,
} from "../../../../typescript/main";

export async function createStripePayment(payload: CreatePaymentPayload): Promise<CreatePaymentResponse> {
    const response = await fetch(`${env.NEXT_PUBLIC_API_BASE_URL}/payments/stripe`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    const result: APIResponse = await response.json();

    if (!response.ok) {
        throw new Error(
            (result as { message?: string }).message ||
            "Failed to create payment session"
        );
    }

    return result.data;
}