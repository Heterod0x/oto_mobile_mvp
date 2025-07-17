import { ConversationDTO } from "@/types/conversation";
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://otomvp-api-78nm.onrender.com";

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
      'Oto-User-Id': userId,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as ConversationDTO[];
}

import { ClipListResponse } from "@/types/clip";

export async function fetchClips(
  conversationId: string,
  userId: string,
  token: string
): Promise<ClipListResponse> {
  const url = `${API_BASE_URL}/clip/list?conversation_id=${conversationId}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Oto-User-Id': userId,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }
  return (await res.json()) as ClipListResponse;
}
