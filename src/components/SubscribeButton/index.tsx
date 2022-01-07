import { useSession, signIn } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJS } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton ({priceId}: SubscribeButtonProps) {
    const session = useSession();

  async  function handleSubscribe() {
        if (!session) {
            signIn('github')
            return;
        }

        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await getStripeJS()
            
         await  stripe.redirectToCheckout({ sessionId: sessionId})
        } catch (err) {
            alert(err.menssage);
        }
    }

    return (
        <button 
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubscribe}
        >
            subscribe now 
        </button>
    )
}