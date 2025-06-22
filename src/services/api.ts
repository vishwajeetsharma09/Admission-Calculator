import axios from 'axios';
import { MBARequest, MBAResponse } from '../types';

const API_BASE_URL = 'https://mba-mini-test-480449117413.us-central1.run.app';

export const mbaAPI = {
  async getAdmissionChances(data: MBARequest): Promise<MBAResponse> {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/match-mba-test`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );

      // Map API response to expected format
      const universities = (response.data as any[]).map((item: any) => ({
        name: item.university || item.name, // support both
        admission_chance: parseFloat(item.admission_chance),
        program_stats: item.program_stats,
      }));

      return { universities };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with error status
          throw new Error(`Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
        } else if (error.request) {
          // Request was made but no response received
          throw new Error('Network error: Unable to connect to the server. Please check your internet connection.');
        } else {
          // Something else happened
          throw new Error(`Request error: ${error.message}`);
        }
      } else {
        // Non-axios error
        throw new Error('An unexpected error occurred. Please try again.');
      }
    }
  },
}; 