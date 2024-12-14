import { Link } from "react-router-dom";

type Props = {
    title: string;
};

export default function Header({ title }: Props) {
    return (
        <Link to="/">
            <h1>{title}</h1>
        </Link>
    );
}