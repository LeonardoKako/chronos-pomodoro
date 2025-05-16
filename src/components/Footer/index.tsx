import styles from './styles.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <a href='#' className={styles.footerLink}>
        Entenda a técnica pomodoro 🍅
      </a>
      <a href='#' className={styles.footerLink}>
        Chronos Pomodoro &copy; {new Date().getFullYear()} - Feito com 💚
      </a>
    </div>
  );
};

export default Footer;
