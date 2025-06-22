export interface University {
  name: string;
  admission_chance: number;
  program_stats?: {
    avg_gmat?: number;
    avg_gpa?: number;
    acceptance_rate?: number;
  };
}

export interface MBARequest {
  gmat_score: number;
  gpa: number;
}

export interface MBAResponse {
  universities: University[];
  message?: string;
}

export interface FormData {
  gmatScore: string;
  gpa: string;
}

export interface FormErrors {
  gmatScore?: string;
  gpa?: string;
}

export type SortOption = 'chance' | 'name' | 'gmat' | 'gpa' | 'acceptance';
export type SortDirection = 'asc' | 'desc'; 