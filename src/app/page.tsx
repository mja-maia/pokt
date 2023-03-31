"use client";
import { useEffect, useState } from "react";

interface Users {
  username: string;
  firstname: string;
  email: string;
  lastname: string;
  image: string;
  id: string;
  website: string;
}

export default function Home() {
  const [users, setUsers] = useState<Users[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const users = fetch("https://fakerapi.it/api/v1/users")
      .then((response) => response.json())
      .then(({ status, data }) => {
        if (status === "OK") {
          setLoading(false);
          setUsers(data);
        }
      });
  }, []);

  return (
    <div className="h-full p-4 flex flex-col items-center justify-center">
      {loading && !users && (
        <div className="flex items-center justify-center space-x-2">
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      )}

      {!loading && users && (
        <>
          <div className="text-center text-3xl text-white mb-5">Users</div>
          <div className="grid  lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
            {users.map(
              ({ username, id, email, firstname, lastname, website }) => (
                <div
                  className="flex flex-col w-96 bg-white p-4  rounded-md"
                  key={id}
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mr-4">
                      Avatar
                    </div>
                    <div>{username}</div>
                  </div>
                  <div className="mt-2 flex flex-col">
                    <div>
                      {firstname} {lastname}
                    </div>
                    <div>{email}</div>
                    <div>{website}</div>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}
