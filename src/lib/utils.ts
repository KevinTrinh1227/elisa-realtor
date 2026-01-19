// Format currency
export function formatCurrency(amount: number | null): string {
  if (amount === null || amount === undefined) return 'Price TBD';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Format date
export function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Format relative date
export function formatRelativeDate(dateString: string | null): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

// Format square footage
export function formatSqft(sqft: number | null): string {
  if (sqft === null || sqft === undefined) return '';
  return new Intl.NumberFormat('en-US').format(sqft) + ' sq ft';
}

// Format bedrooms/bathrooms
export function formatBedBath(beds: number | null, baths: number | null): string {
  const parts = [];
  if (beds !== null && beds !== undefined) {
    parts.push(`${beds} bed${beds !== 1 ? 's' : ''}`);
  }
  if (baths !== null && baths !== undefined) {
    parts.push(`${baths} bath${baths !== 1 ? 's' : ''}`);
  }
  return parts.join(' | ');
}

// Get status badge color
export function getStatusColor(status: string): { bg: string; text: string } {
  switch (status.toLowerCase()) {
    case 'active':
      return { bg: 'bg-green-100', text: 'text-green-800' };
    case 'sold':
      return { bg: 'bg-blue-100', text: 'text-blue-800' };
    case 'leased':
      return { bg: 'bg-purple-100', text: 'text-purple-800' };
    case 'pending':
      return { bg: 'bg-yellow-100', text: 'text-yellow-800' };
    default:
      return { bg: 'bg-gray-100', text: 'text-gray-800' };
  }
}

// Generate star rating display
export function getStarRating(rating: number | null): string {
  if (rating === null) return '';
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return '★'.repeat(fullStars) + (hasHalf ? '½' : '') + '☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0));
}

// Truncate text
export function truncateText(text: string | null, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

// Generate slug from name
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Calculate average rating
export function calculateAverageRating(ratings: (number | null)[]): number {
  const validRatings = ratings.filter((r): r is number => r !== null);
  if (validRatings.length === 0) return 0;
  return validRatings.reduce((sum, r) => sum + r, 0) / validRatings.length;
}
