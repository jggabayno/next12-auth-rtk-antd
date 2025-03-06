import { StyleInterface } from "@/interfaces/StyleInterface"
// import { CgMenuRight } from "@react-icons/all-files/cg/CgMenuRight"
import { ActionCreatorWithoutPayload, AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit"

interface Props {
  styles: StyleInterface,
  dispatch: ThunkDispatch<any, undefined, AnyAction> & Dispatch<AnyAction>,
  toggleDrawer: ActionCreatorWithoutPayload<"settings/drawer/toggle">
}

const BurgerMenu : React.FC<Props> = ({dispatch, toggleDrawer, styles}) => {
  return (
    <div>1</div>
    // <div onClick={() => dispatch(toggleDrawer())} className={styles.burger_menu}><CgMenuRight/></div>
  )
}

export default BurgerMenu