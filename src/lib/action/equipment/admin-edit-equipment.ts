

"use server";

import { env } from "@/config/env-config";
import type { EquipmentDataType } from "../../../../typescript/main";
import { getJWTTokenServer } from "@/lib/jwt/getJwtTokenServer";

type UpdateEquipmentData = Partial<
  Omit<
    EquipmentDataType,
    "id" | "creatorEmail" | "ownerInformation" | "status" | "equipmentImage"
  >
> & {
  equipmentImage?: string | string[];
};

export async function updateEquipment(
  id: string,
  updateData: UpdateEquipmentData
) {
  const token = await getJWTTokenServer();

  const response = await fetch(
    `${env.NEXT_PUBLIC_API_BASE_URL}/admin-action/update/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update equipment");
  }

  return result.data;
}
