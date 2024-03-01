import moment from 'moment';
import { useCallback } from 'react';

export const useFormattedDate = () => {
    const formattedDate = useCallback((dateString?: string | null) => {
        if (dateString) {
            return moment(dateString).format('YYYY-MM-DD');
        }

        return null;
    }, []);

    return { formattedDate };
};
