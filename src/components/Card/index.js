import styles from "./card.module.scss";
import { Link, useLocation } from "react-router-dom";
import { removeTeamMember } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { setNewMember } from "../../redux/actions";

const Card = ({ hero }) => {
  const dispatch = useDispatch();
  let { pathname } = useLocation();

  const { name, image, id } = hero;

  const onSetNewMember = (hero) => {
    dispatch(setNewMember(hero));
  };
  return (
    <div className={styles.containerCard}>
      <div className="alkemy-card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={image.url} />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          {
            <div className={styles.buttons}>
              <Link to={`/hero/${id}`}>
                <button
                  style={{ marginRight: "10px" }}
                  className="alkemy-btn-primary"
                >
                  Details
                </button>
              </Link>

              {pathname !== "/search" ? (
                <button
                  className="alkemy-btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(removeTeamMember(id));
                  }}
                >
                  Remove
                </button>
              ) : (
                <button
                  className="alkemy-btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    onSetNewMember(hero);
                  }}
                >
                  Add hero
                </button>
              )}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Card;
