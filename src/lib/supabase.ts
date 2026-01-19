// Mock data version for demo - switch to Supabase when client approves
import type { AgentProfile, Listing, Review, Recommendation, Neighborhood } from './types';
import {
  agentProfile as mockProfile,
  listings as mockListings,
  reviews as mockReviews,
  recommendations as mockRecommendations,
  neighborhoods as mockNeighborhoods,
} from './data';

// Set to true to use real Supabase, false for demo mode
const USE_SUPABASE = false;

// Supabase client (only used when USE_SUPABASE is true)
// import { createClient } from '@supabase/supabase-js';
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get agent profile
export async function getAgentProfile(): Promise<AgentProfile | null> {
  if (!USE_SUPABASE) {
    return mockProfile;
  }
  // Supabase implementation would go here
  return null;
}

// Helper function to get listings
export async function getListings(status?: string, limit?: number): Promise<Listing[]> {
  if (!USE_SUPABASE) {
    let result = [...mockListings];

    if (status) {
      result = result.filter((l) => l.status === status);
    }

    // Sort by sold_date descending (active listings first, then by date)
    result.sort((a, b) => {
      if (a.status === 'active' && b.status !== 'active') return -1;
      if (a.status !== 'active' && b.status === 'active') return 1;
      const dateA = a.sold_date || a.listing_date || '';
      const dateB = b.sold_date || b.listing_date || '';
      return dateB.localeCompare(dateA);
    });

    if (limit) {
      result = result.slice(0, limit);
    }

    return result;
  }
  return [];
}

// Helper function to get a single listing
export async function getListing(id: string): Promise<Listing | null> {
  if (!USE_SUPABASE) {
    return mockListings.find((l) => l.id === id) || null;
  }
  return null;
}

// Helper function to get reviews
export async function getReviews(limit?: number): Promise<Review[]> {
  if (!USE_SUPABASE) {
    let result = [...mockReviews];

    // Sort by review_date descending
    result.sort((a, b) => {
      const dateA = a.review_date || '';
      const dateB = b.review_date || '';
      return dateB.localeCompare(dateA);
    });

    if (limit) {
      result = result.slice(0, limit);
    }

    return result;
  }
  return [];
}

// Helper function to get recommendations
export async function getRecommendations(limit?: number): Promise<Recommendation[]> {
  if (!USE_SUPABASE) {
    let result = [...mockRecommendations];

    // Sort by recommendation_date descending
    result.sort((a, b) => {
      const dateA = a.recommendation_date || '';
      const dateB = b.recommendation_date || '';
      return dateB.localeCompare(dateA);
    });

    if (limit) {
      result = result.slice(0, limit);
    }

    return result;
  }
  return [];
}

// Helper function to get neighborhoods
export async function getNeighborhoods(): Promise<Neighborhood[]> {
  if (!USE_SUPABASE) {
    return [...mockNeighborhoods].sort((a, b) => a.name.localeCompare(b.name));
  }
  return [];
}

// Helper function to get a single neighborhood
export async function getNeighborhood(slug: string): Promise<Neighborhood | null> {
  if (!USE_SUPABASE) {
    return mockNeighborhoods.find((n) => n.slug === slug) || null;
  }
  return null;
}

// Helper function to submit contact form
export async function submitContactForm(formData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<boolean> {
  // For demo, just log the submission
  console.log('Contact form submission:', formData);
  return true;
}

// Supabase client export for components that might need it directly
export const supabase = null;
