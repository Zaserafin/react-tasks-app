import { useThemeStore } from '@/stores/ThemeContext';

export default function ThemeToggleButton() {
  const { isLight, toggleTheme } = useThemeStore();

  return (
    <button onClick={toggleTheme}>
      {isLight ? (
        <i className="bi bi-brightness-high-fill"></i>
      ) : (
        <i className="bi bi-moon-stars-fill"></i>
      )}
    </button>
  );
}
