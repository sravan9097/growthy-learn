
import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface UserTILStatus {
  green: boolean[];
  red: boolean[];
}

export default function TILDashboardPage() {
  // Sample data mimicking the dashboard shown in the mockup
  const weeks = [
    { range: "Mar 24 - Mar 28", thumbsUp: 23, thumbsDown: 15, percentage: 61 },
    { range: "Mar 31 - Apr 04", thumbsUp: 26, thumbsDown: 12, percentage: 68 },
    { range: "Apr 07 - Apr 11", thumbsUp: 28, thumbsDown: 10, percentage: 74 },
    { range: "Apr 14 - Apr 18", thumbsUp: 0, thumbsDown: 38, percentage: null },
  ];

  const users = [
    { name: "Sravan Kumar Mulugurthy", count: 123, status: [
      {green: [true, false, true, true, true], red: [false, true, false, false, false]},
      {green: [true, true, true, false, true], red: [false, false, false, true, false]},
      {green: [false, false, true, true, true], red: [true, true, false, false, false]},
      {green: [true, false, false, false, false], red: [false, true, true, true, true]},
    ]},
    { name: "Durga Prakash Madishetty", count: 88, status: [
      {green: [false, false, false, false, false], red: [true, true, true, true, true]},
      {green: [false, false, false, false, false], red: [true, true, true, true, true]},
      {green: [false, false, false, false, false], red: [true, true, true, true, true]},
      {green: [false, false, false, false, false], red: [true, true, true, true, true]},
    ]},
    { name: "Geetha P", count: 3, status: [
      {green: [false, false, false, false, true], red: [true, true, true, true, false]},
      {green: [false, false, false, false, false], red: [true, true, true, true, true]},
      {green: [false, false, false, false, false], red: [true, true, true, true, true]},
      {green: [false, false, false, false, false], red: [true, true, true, true, true]},
    ]},
    { name: "Disha H", count: 4, status: [
      {green: [false, false, false, false, false], red: [true, true, true, true, true]},
      {green: [false, false, false, true, false], red: [true, true, true, false, true]},
      {green: [false, false, false, false, false], red: [true, true, true, true, true]},
      {green: [false, false, false, false, false], red: [true, true, true, true, true]},
    ]},
    { name: "Sandeep Pyata", count: 71, status: [
      {green: [false, false, false, false, false], red: [true, true, true, true, true]},
      {green: [false, false, false, false, false], red: [true, true, true, true, true]},
      {green: [true, true, true, true, true], red: [false, false, false, false, false]},
      {green: [true, false, false, false, false], red: [false, true, true, true, true]},
    ]},
    { name: "Chirath R", count: 20, status: [
      {green: [false, false, false, true, false], red: [true, true, true, false, true]},
      {green: [false, true, true, false, false], red: [true, false, false, true, true]},
      {green: [false, false, true, false, true], red: [true, true, false, true, false]},
      {green: [false, false, false, false, false], red: [true, true, true, true, true]},
    ]},
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thurs', 'Fri'];

  return (
    <Layout>
      <div>
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              TIL Dashboard
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start space-x-4 mb-4">
            <div className="bg-growthy-green-100 text-growthy-green-500 rounded-full p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Our Goal</h3>
              <p className="text-growthy-neutral-500">
                <span className="text-growthy-green-500 font-bold">100%</span> user participation in writing TILs, with every user writing at least <span className="text-growthy-green-500 font-bold">3 TILs</span> a week.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 w-48">Member / Total TILs</th>
                {weeks.map((week, index) => (
                  <th key={index} className="text-center p-2" colSpan={5}>
                    <div className="mb-2">{week.range}</div>
                    <div className="flex justify-center gap-4">
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4 text-growthy-green-500" />
                        <span>{week.thumbsUp}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsDown className="h-4 w-4 text-growthy-red-500" />
                        <span>{week.thumbsDown}</span>
                      </div>
                      <div className={`px-2 rounded ${week.percentage ? (week.percentage >= 70 ? 'bg-growthy-green-500' : 'bg-growthy-red-500') : 'bg-growthy-neutral-300'} text-white`}>
                        {week.percentage ? `${week.percentage}%` : '--'}
                      </div>
                    </div>
                    <div className="flex justify-around mt-2">
                      {days.map((day, idx) => (
                        <div key={idx} className="text-xs text-growthy-neutral-400">{day}</div>
                      ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, userIndex) => (
                <tr key={userIndex} className="border-b">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-growthy-neutral-400 text-sm">({user.count})</div>
                    </div>
                  </td>
                  {user.status.map((weekStatus, weekIndex) => (
                    <React.Fragment key={weekIndex}>
                      {weekStatus.green.map((isGreen, dayIndex) => {
                        const isRed = weekStatus.red[dayIndex];
                        return (
                          <td key={dayIndex} className="text-center py-4 px-2">
                            <div className={`w-6 h-6 rounded-full mx-auto ${isGreen ? 'bg-growthy-green-300' : isRed ? 'bg-growthy-red-200' : 'bg-growthy-neutral-200'} flex items-center justify-center`}>
                              {isGreen && <div className="w-3 h-3 rounded-full bg-growthy-green-500"></div>}
                              {isRed && <div className="w-3 h-3 rounded-full bg-growthy-red-500"></div>}
                            </div>
                          </td>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
