export interface UserProfileResponse {
  id: string;
  name: string | null;
  age: number | null;
  nationality: string | null;
  first_language: string | null;
  second_languages: string | null;
  interests: string | null;
  preferred_topics: string | null;
}

export interface UserUpdateRequest extends Partial<UserProfileResponse> {}
