import { NextRequest } from "next/server";

export interface ExtendedRequest extends NextRequest {
  userData?: User;
}
