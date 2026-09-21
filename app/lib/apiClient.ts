const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://localhost:3000";

class ApiClient {
  // Stores the base URL used to build API request URLs.
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  // Sends an HTTP request to the given API endpoint.
  // Merges default settings with any options provided by the caller.
  async request(endpoint: string, options: RequestInit = {}) {
    // Combine the base URL with the requested endpoint.
    const url = `${this.baseUrl}${endpoint}`;

    // Default request configuration.
    // Includes JSON headers and cookies for authenticated requests.
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include",
      ...options,
    };

    // Send the request to the API.
    const response = await fetch(url, config);

    // Handle unauthorized requests without throwing an error.
    if (response.status === 401) {
      return null;
    }

    // Handle other unsuccessful HTTP responses.
    if (!response.ok) {
      const error = await response
        .json()
        .catch(() => ({ error: "Network error" }));

      throw new Error(error.error || "Request failed");
    }
  }

  // Auth Methods
  async register(userData:unknown){
    return this.request("/api/auth/login",{
      method:"POST",
      body: JSON.stringify({userData}),
    });
  }
  
  async login(email:string,password:string){
    return this.request("api/auth/login",{
      method:"POST",
      body:JSON.stringify({email,password}),
    })
  }

  async logout(){
    return this.request("api/auth/logout",{
      method:"POST",
    })
  }

  async getCurrentUsers(){
    return this.request("api/auth/me")
  }

  // User Methods
  async getUsers(){
    return this.request("api/auth/users")
  }

  // Admin Methods
  async updateUserRole(userId:string,role:string){
    return this.request(`api/auth/users/${userId}/role`,{
      method: "PATCH",
      body:JSON.stringify({role})
    })
  }

  async assignUserToTeam(userId:string,teamId:string){
    return this.request(`api/auth/users/${userId}/team`,{
      method: "PATCH",
      body:JSON.stringify({teamId})
    })
  }

}
