import axios from 'axios';
import { useQuery } from '@tanstack/vue-query';
import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { toast } from 'vue3-toastify';
import type { Joke } from '../types';

const url = `${import.meta.env.VITE_APP_API_URL}/jokes/random/${import.meta.env.VITE_APP_JOKE_COUNT}`;

export function useAllJokesQuery() {
  const { t } = useI18n();
  const { isFetching, isError, data, refetch } = useQuery({
    queryKey: ['jokes', 'all'],
    queryFn: getAllJokes,
  });

  watch(isError, (newIsError) => {
    if (newIsError) {
      toast.error(t('errors.genericError'));
    }
  });

  return {
    isFetching,
    data,
    refetch,
  };
}

async function getAllJokes(): Promise<Array<Joke>> {
  try {
    const jokes = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return jokes?.data as Array<Joke>;
  } catch (error) {
    /**
     * *** Could log the error somewhere, or console.error on non-prod env ***
     */
    throw error;
  }
}
