export type RequestStatus = 'OPEN' | 'REVEALED' | 'RESOLVED' | 'CLOSED_NO_RESULT' | 'CANCELED';
export type ResolutionType = 'INDICATED_PLACE' | 'OTHER_PLACE' | 'NOT_FOUND';
export interface City {
  id: number;
  name: string;
  normalized_name: string;
  state_name: string;
  state_code: string;
  country_name: string;
  country_code: string;
  slug: string;
}
export interface Profile {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  home_city_id: number;
  created_at: string;
  updated_at: string;
}
export interface LocalRequest {
  id: string;
  requester_id: string;
  description: string;
  city_id: number;
  neighborhood: string | null;
  status: RequestStatus;
  indication_count: number;
  responses_revealed_at: string | null;
  canceled_at: string | null;
  hidden_at: string | null;
  created_at: string;
  updated_at: string;
}
export interface Place {
  id: string;
  google_place_id: string;
  city_id: number;
  last_verified_at: string;
}
export interface Indication {
  id: string;
  request_id: string;
  user_id: string;
  place_id: string;
  comment: string | null;
  created_at: string;
  hidden_at: string | null;
}
export interface Resolution {
  id: string;
  request_id: string;
  type: ResolutionType;
  place_id: string | null;
  resolved_by: string;
  created_at: string;
}
export interface Reward {
  id: string;
  user_id: string;
  request_id: string;
  indication_id: string;
  city_id: number;
  type: string;
  points: number;
  created_at: string;
}
export interface Report {
  id: string;
  reporter_id: string;
  target_type: string;
  target_id: string;
  reason: string;
  status: string;
  created_at: string;
}
export interface Audit {
  id: string;
  actor_id: string | null;
  event_type: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Json;
  created_at: string;
}
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];
export interface RankingEntry {
  position: number;
  username: string;
  display_name: string;
  avatar_url: string | null;
  points: number;
  confirmations: number;
}
export interface AdminAccount {
  id: string;
  username: string | null;
  display_name: string | null;
  blocked: boolean;
  created_at: string;
}
export interface AccountState {
  admin: boolean;
  onboarded: boolean;
}
export interface ProfileStats {
  points: number;
  confirmations: number;
}
export interface Metrics {
  requests: number;
  with_indications: number;
  resolved: number;
  contributors: number;
  avg_first_indication_seconds: number | null;
  avg_resolution_seconds: number | null;
  analytics: Record<string, number>;
}
export type ActionState = { error?: string; success?: string; fields?: Record<string, string[]> };
export type FormAction = (state: ActionState, form: FormData) => Promise<ActionState>;
