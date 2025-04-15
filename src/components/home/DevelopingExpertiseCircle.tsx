
import React from "react";

export function DevelopingExpertiseCircle() {
  return (
    <div className="px-6 py-6 bg-white rounded-xl w-full inline-flex border border-gray-200" >
      <div>
        <div className="flex items-center  gap-2">
          <img src={'/GrowthyIcon-Djqs-wG6.svg'} alt="Growth" className="w-10 h-10" />
          <div className="self-stretch justify-start">
            <span className="text-primary-600 text-xl font-bold leading-10">
              What is DEC?{' '}
            </span>
            <span className="text-xl font-medium leading-loose">
              (Developing Expertise Culture)
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col p-3 pt-8 flex-1">
            <div className="self-stretch text-lg font-normal leading-7">
              <span className="text-[#52525b] text-base">
                It is a recipe for building expertise at BeautifulCode, centred around
              </span>
              <span className="text-[#16a34a] text-lg font-extrabold" style={{ whiteSpace: 'nowrap' }}>
                {' '}3 key-practices.
              </span>
            </div>
            <div className="flex flex-col pt-8">
              <div className="text-base font-semibold ">
                How does it benefit you?
              </div>
              <div className="flex flex-col pt-2">
                <div className="text-[#52525b] text-sm font-normal leading-6">
                  <div className="flex gap-2">
                    <p className="flex-shrink-0">&#8226;</p>
                    <p className="break-words">
                      {' '}
                      You will solidify your understanding with Writing and
                      feedback on your work.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <p className="flex-shrink-0">&#8226;</p>
                    <p className="break-words">
                      {' '}
                      You will develop habits such as Researching, Experimenting
                      and Writing, which differentiates you in this AI world{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-[75%]">
        <img
          src={'/GoalBreifIcon.svg'}
          alt="goal-breif"
          className="w-full max-w-[420px] h-auto"
        />
      </div>
    </div>
  );
}
