import styles from '@/components/atoms/Modified.module.css';

export default function Modified({ children }: { children: string }) {
  return (
    <span className={styles.tooltip}>
      (modified)
      <span className={styles.tooltiptext}>{children}</span>
    </span>
  );
}
