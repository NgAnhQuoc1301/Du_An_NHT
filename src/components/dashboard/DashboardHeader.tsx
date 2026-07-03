import {
  CalendarDays,
  Building2,
  Search,
  RotateCcw,
} from "lucide-react";

type Props = {
    title:string;
    description:string;
}

export default function DashboardHeader({
  title,
  description,
}: Props) {

  return (

    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">

      {/* Title */}

      <div className="mb-6">

        <h1 className="text-3xl font-bold text-slate-800">

          {title}

        </h1>

        <p className="text-slate-500 mt-2">

          {description}

        </p>

      </div>

      {/* Filters */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        {/* Date */}

        <div>

          <label className="text-sm text-slate-500 mb-1 block">

            Date Range

          </label>

          <div className="flex items-center border rounded-lg px-3 py-2">

            <CalendarDays
              size={18}
              className="text-slate-400 mr-2"
            />

            <select className="w-full outline-none">

              <option>Today</option>

              <option>This Week</option>

              <option>This Month</option>

              <option>This Year</option>

            </select>

          </div>

        </div>

        {/* Branch */}

        <div>

          <label className="text-sm text-slate-500 mb-1 block">

            Branch

          </label>

          <div className="flex items-center border rounded-lg px-3 py-2">

            <Building2
              size={18}
              className="text-slate-400 mr-2"
            />

            <select className="w-full outline-none">

              <option>All Branches</option>

              <option>Ha Noi</option>

              <option>Da Nang</option>

              <option>Ho Chi Minh</option>

            </select>

          </div>

        </div>

        {/* Search */}

        <div>

          <label className="text-sm text-slate-500 mb-1 block">

            Search

          </label>

          <div className="flex items-center border rounded-lg px-3 py-2">

            <Search
              size={18}
              className="text-slate-400 mr-2"
            />

            <input
              placeholder="Search..."
              className="outline-none w-full"
            />

          </div>

        </div>

        {/* Buttons */}

        <div className="flex items-end gap-3">

          <button
            className="
              flex-1
              bg-blue-600
              hover:bg-blue-700
              text-white
              rounded-lg
              py-2.5
              transition
            "
          >

            Apply

          </button>

          <button
            className="
              p-3
              border
              rounded-lg
              hover:bg-slate-50
            "
          >

            <RotateCcw size={18} />

          </button>

        </div>

      </div>

    </div>

  );

}