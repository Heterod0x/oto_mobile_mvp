import { ConversationDTO } from "@/types/conversation";

import { ClipListResponse } from "@/types/clip";

import { MicrotrendListResponse, TrendListResponse } from "@/types/trend";

import { AnalysisResponse, TranscriptResponse } from "@/types/analysis";
import {
  PointBalanceResponse,
  UserProfileResponse,
  UserUpdateRequest,
} from "@/types/user";
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://otomvp-api-78nm.onrender.com";

export interface UploadResponse {
  id: string;
  status: string;
  flow_run_id: string;
}

/**
 * Upload an audio file to the backend API.
 * @param uri local file URI to upload
 * @param userId user identifier for the Oto backend
 * @param token Privy access token for bearer authentication
 * @param onProgress optional callback fired with upload progress percentage
 */
export async function uploadAudio(
  uri: string,
  userId: string,
  token: string,
  onProgress?: (progress: number) => void
): Promise<UploadResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    const fileName = uri.split("/").pop() || "recording.m4a";
    formData.append("file", {
      uri,
      name: fileName,
      type: "audio/m4a",
    } as any);

    if (xhr.upload && onProgress) {
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const p = Math.round((e.loaded / e.total) * 100);
          onProgress(p);
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch (err) {
          reject(new Error("Failed to parse response"));
        }
      } else {
        reject(new Error(`HTTP ${xhr.status}: ${xhr.responseText}`));
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));
    xhr.onabort = () => reject(new Error("Upload aborted"));

    xhr.open("POST", `${API_BASE_URL}/conversation/create`);
    xhr.setRequestHeader("Authorization", `Bearer ${token}`);
    xhr.setRequestHeader("Oto-User-Id", userId);
    xhr.send(formData);
  });
}

export async function fetchConversations(
  userId: string,
  token: string
): Promise<ConversationDTO[]> {
  const res = await fetch(`${API_BASE_URL}/conversation/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Oto-User-Id": userId,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as ConversationDTO[];
}

export async function fetchConversation(
  conversationId: string,
  userId: string,
  token: string
): Promise<ConversationDTO> {
  const res = await fetch(`${API_BASE_URL}/conversation/${conversationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Oto-User-Id": userId,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as ConversationDTO;
}

export async function fetchClips(
  conversationId: string,
  userId: string,
  token: string
): Promise<ClipListResponse> {
  const url = `${API_BASE_URL}/clip/list?conversation_id=${conversationId}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Oto-User-Id": userId,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as ClipListResponse;
}

export async function fetchClipAudioUrl(
  clipId: string,
  userId: string,
  token: string
): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/clip/${clipId}/audio`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Oto-User-Id": userId,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return res.text();
}

export async function fetchAnalysis(
  conversationId: string,
  userId: string,
  token: string
): Promise<AnalysisResponse> {
  const res = await fetch(`${API_BASE_URL}/analysis/${conversationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Oto-User-Id": userId,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as AnalysisResponse;
}

export async function fetchTranscript(
  conversationId: string,
  userId: string,
  token: string
): Promise<TranscriptResponse> {
  const res = await fetch(`${API_BASE_URL}/transcript/${conversationId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Oto-User-Id": userId,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as TranscriptResponse;
}

export async function fetchTrends(): Promise<TrendListResponse> {
  const res = await fetch(`${API_BASE_URL}/trend/trends`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as TrendListResponse;
}

export async function fetchMicrotrends(): Promise<MicrotrendListResponse> {
  const res = await fetch(`${API_BASE_URL}/trend/microtrends`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as MicrotrendListResponse;
}

export async function fetchUserProfile(
  userId: string,
  token: string
): Promise<UserProfileResponse> {
  const res = await fetch(`${API_BASE_URL}/user/get`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Oto-User-Id": userId,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as UserProfileResponse;
}

export async function updateUserProfile(
  data: UserUpdateRequest,
  userId: string,
  token: string
): Promise<UserProfileResponse> {
  const res = await fetch(`${API_BASE_URL}/user/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Oto-User-Id": userId,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as UserProfileResponse;
}

export async function fetchPointBalance(
  userId: string,
  token: string
): Promise<PointBalanceResponse> {
  const res = await fetch(`${API_BASE_URL}/point/get`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Oto-User-Id": userId,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as PointBalanceResponse;
}
