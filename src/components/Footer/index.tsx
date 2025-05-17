import styles from './styles.module.css';
import RouterLink from '../RouterLink';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <RouterLink href='/about-pomodoro' className={styles.footerLink}>
        Entenda a técnica pomodoro 🍅
      </RouterLink>
      <RouterLink href='/' className={styles.footerLink}>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com 💚
      </RouterLink>
    </div>
  );
};

export default Footer;
