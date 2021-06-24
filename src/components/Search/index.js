import { useInput } from "../../hooks/useInput";
import { useHistory } from "react-router-dom";
import styles from "./search.module.scss";

const Search = () => {
  const history = useHistory();
  const { value: hero, bind: bindHero, reset: resetHero } = useInput("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    history.push(`/search?hero=${hero}`);
    resetHero();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Find a hero for your team"
        {...bindHero}
        name="hero"
      />
      <button type="submit" className={styles.button}>
        <i className="bi bi-search"></i>
      </button>
    </form>
  );
};

export default Search;
