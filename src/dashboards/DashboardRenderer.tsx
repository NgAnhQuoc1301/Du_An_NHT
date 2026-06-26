import Style1 from "./styles/Style1";
import Style2 from "./styles/Style2";
import Style3 from "./styles/Style3";
import Style4 from "./styles/Style4";
import Style5 from "./styles/Style5";

import type { WidgetConfig } from "../types/widget";

type Props = {
  style: string;
  title: string;
  widgets: WidgetConfig[];
};

export default function DashboardRenderer(
  {
  style,
  title,
  widgets,
}: Props) {

  switch (style) {

    case "style1":
      return (
        <Style1
          title={title}
          widgets={widgets}
        />
      );

    case "style2":
      return (
        <Style2
          title={title}
          widgets={widgets}
        />
      );

    case "style3":
      return (
        <Style3
          title={title}
          widgets={widgets}
        />
      );

    case "style4":
      return (
        <Style4
          title={title}
          widgets={widgets}
        />
      );

    case "style5":
      return (
        <Style5
          title={title}
          widgets={widgets}
        />
      );

    default:
      return (
        <Style1
          title={title}
          widgets={widgets}
        />
      );
  }
}