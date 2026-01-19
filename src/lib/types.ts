export interface AgentProfile {
  id: string;
  name: string;
  title: string | null;
  phone: string | null;
  email: string | null;
  photo_url: string | null;
  bio: string | null;
  har_url: string | null;
  license_number: string | null;
  years_experience: number | null;
  total_sales: number | null;
  total_volume: number | null;
  updated_at: string;
}

export interface Listing {
  id: string;
  har_listing_id: string | null;
  address: string;
  city: string | null;
  state: string | null;
  zip: string | null;
  price: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  sqft: number | null;
  lot_size: string | null;
  year_built: number | null;
  property_type: string | null;
  status: string;
  sold_date: string | null;
  sold_price: number | null;
  listing_date: string | null;
  description: string | null;
  features: string[] | null;
  images: string[] | null;
  har_url: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  har_review_id: string | null;
  reviewer_name: string | null;
  reviewer_photo_url: string | null;
  rating: number | null;
  review_text: string | null;
  review_date: string | null;
  transaction_type: string | null;
  property_address: string | null;
  har_url: string | null;
  created_at: string;
}

export interface Recommendation {
  id: string;
  har_rec_id: string | null;
  recommender_name: string | null;
  recommender_title: string | null;
  relationship: string | null;
  recommendation_text: string | null;
  recommendation_date: string | null;
  created_at: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  avg_price: number | null;
  total_listings: number | null;
  har_url: string | null;
  highlights: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string | null;
  created_at: string;
}

export interface SyncLog {
  id: string;
  sync_type: string;
  status: string;
  records_synced: number | null;
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
}

// Database type for Supabase client
export interface Database {
  public: {
    Tables: {
      agent_profile: {
        Row: AgentProfile;
        Insert: Omit<AgentProfile, 'id' | 'updated_at'>;
        Update: Partial<Omit<AgentProfile, 'id'>>;
      };
      listings: {
        Row: Listing;
        Insert: Omit<Listing, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Listing, 'id' | 'created_at'>>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, 'id' | 'created_at'>;
        Update: Partial<Omit<Review, 'id' | 'created_at'>>;
      };
      recommendations: {
        Row: Recommendation;
        Insert: Omit<Recommendation, 'id' | 'created_at'>;
        Update: Partial<Omit<Recommendation, 'id' | 'created_at'>>;
      };
      neighborhoods: {
        Row: Neighborhood;
        Insert: Omit<Neighborhood, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Neighborhood, 'id' | 'created_at'>>;
      };
      contact_submissions: {
        Row: ContactSubmission;
        Insert: Omit<ContactSubmission, 'id' | 'created_at'>;
        Update: Partial<Omit<ContactSubmission, 'id' | 'created_at'>>;
      };
      sync_logs: {
        Row: SyncLog;
        Insert: Omit<SyncLog, 'id' | 'started_at'>;
        Update: Partial<Omit<SyncLog, 'id' | 'started_at'>>;
      };
    };
  };
}
