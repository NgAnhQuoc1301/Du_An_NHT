import Style1 from "./styles/Style1";
import Style2 from "./styles/Style2";
import Style3 from "./styles/Style3";
import Style4 from "./styles/Style4";
import Style5 from "./styles/Style5";

type Props = {
  style: string;
  title: string;
};

export default function DashboardRenderer({
  style,
  title,
}: Props) {

  switch (style) {

    case "style1":
      return <Style1 title={title} />;

    case "style2":
      return <Style2 title={title} />;

    case "style3":
      return <Style3 title={title} />;

    case "style4":
      return <Style4 title={title} />;

    case "style5":
      return <Style5 title={title} />;

    default:
      return <Style1 title={title} />;
  }
}