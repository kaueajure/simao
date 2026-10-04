import type {
  City,
  Profile,
  LocalRequest,
  Place,
  Indication,
  Resolution,
  Reward,
  Report,
  Audit,
  Json,
  RankingEntry,
  AdminAccount,
  AccountState,
  ProfileStats,
  Metrics,
  ResolutionType,
} from '@/lib/types';
type Table<T> = {
  Row: { [K in keyof T]: T[K] };
  Insert: Partial<T>;
  Update: Partial<T>;
  Relationships: [];
};
type Fn<A, R> = { Args: A; Returns: R };
export type Database = {
  public: {
    Tables: {
      cities: Table<City>;
      profiles: Table<Profile>;
      requests: Table<LocalRequest>;
      places: Table<Place>;
      indications: Table<Indication>;
      request_resolutions: Table<Resolution>;
      reward_events: Table<Reward>;
      reports: Table<Report>;
      audit_logs: Table<Audit>;
    };
    Views: Record<string, never>;
    Functions: {
      request_editable: Fn<{ p_request_id: string }, boolean>;
      indication_groups: Fn<
        { p_request_id: string; p_offset?: number },
        { place_id: string; indications: number }[]
      >;
      is_admin: Fn<Record<string, never>, boolean>;
      account_state: Fn<Record<string, never>, AccountState>;
      save_profile: Fn<
        {
          p_username: string;
          p_display_name: string;
          p_city_id: number;
          p_use_google_photo: boolean;
        },
        undefined
      >;
      log_login: Fn<Record<string, never>, undefined>;
      consume_api_limit: Fn<{ p_bucket: string }, undefined>;
      create_request: Fn<
        { p_description: string; p_city_id: number; p_neighborhood?: string },
        string
      >;
      edit_request: Fn<
        { p_request_id: string; p_description: string; p_city_id: number; p_neighborhood?: string },
        undefined
      >;
      submit_verified_indication: Fn<
        {
          p_actor: string;
          p_request_id: string;
          p_google_place_id: string;
          p_verified_city_id: number;
          p_comment?: string;
        },
        string
      >;
      reveal_responses: Fn<{ p_request_id: string }, undefined>;
      cancel_request: Fn<{ p_request_id: string }, undefined>;
      resolve_request: Fn<
        { p_request_id: string; p_type: ResolutionType; p_place_id?: string | null },
        string
      >;
      report_content: Fn<
        { p_target_type: string; p_target_id: string; p_reason: string },
        undefined
      >;
      admin_moderate: Fn<{ p_action: string; p_target_id: string }, undefined>;
      admin_accounts: Fn<{ p_search?: string; p_offset?: number }, AdminAccount[]>;
      city_ranking: Fn<{ p_city_id: number; p_offset?: number }, RankingEntry[]>;
      profile_stats: Fn<{ p_username: string }, ProfileStats>;
      admin_metrics: Fn<Record<string, never>, Metrics>;
      record_analytics: Fn<{ p_event: string; p_fingerprint: string }, undefined>;
    };
    Enums: { request_status: LocalRequest['status']; resolution_type: ResolutionType };
    CompositeTypes: Record<string, never>;
  };
};
export type { Json };
