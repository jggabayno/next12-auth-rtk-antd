interface IBurger {
    onToggleNav: any,
    className: any
}

const Burger : React.FC<IBurger> = ({ className, onToggleNav }) => (
    <svg onClick={onToggleNav} className={className} viewBox="0 0 26 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="26" height="3" fill="#111"/>
        <rect x="9" y="13" width="17" height="3" fill="#111"/>
    </svg>
)

export default Burger