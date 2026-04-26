import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const getToken = () => sessionStorage.getItem("flownaticx_admin_token");

const fetchWithAuth = async (url, options = {}) => {
  const token = getToken();
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (res.status === 401) {
    sessionStorage.removeItem("flownaticx_admin_token");
    window.location.href = "/admin";
    throw new Error("Unauthorized");
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
};

export function useLeads() {
  return useQuery({
    queryKey: ["leads"],
    queryFn: () => fetchWithAuth("/api/leads"),
    select: (data) => data.leads || [],
  });
}

export function useClients() {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchWithAuth("/api/clients"),
    select: (data) => data.clients || [],
  });
}

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => fetchWithAuth("/api/tasks"),
    select: (data) => data.tasks || [],
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updates) => fetchWithAuth("/api/leads", {
      method: "PATCH",
      body: JSON.stringify(updates),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useOnboardClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (clientData) => fetchWithAuth("/api/clients", {
      method: "POST",
      body: JSON.stringify(clientData),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useImportLeads() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (rows) => fetchWithAuth("/api/import-leads", {
      method: "POST",
      body: JSON.stringify({ rows }),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
