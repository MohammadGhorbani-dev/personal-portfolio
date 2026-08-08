import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Folder, Clock, GitCommit } from 'lucide-react';

interface GitHubProfile {
  avatar_url: string;
  public_repos: number;
  updated_at: string;
  name: string;
  login: string;
}

interface GitHubRepo {
  name: string;
}

interface GitHubData extends GitHubProfile {
  latest_repo?: string;
}

export default function GitHubStats() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileRes = await fetch('https://api.github.com/users/MohammadGhorbani-dev');
        const profileData = await profileRes.json();
        
        let latestRepo = '';
        try {
          const reposRes = await fetch('https://api.github.com/users/MohammadGhorbani-dev/repos?sort=updated&per_page=1');
          const reposData = await reposRes.json();
          if (reposData && reposData.length > 0) {
            latestRepo = reposData[0].name;
          }
        } catch (e) {
          console.error("Failed to fetch repos", e);
        }

        setData({
          ...profileData,
          latest_repo: latestRepo
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="flex-[2] rounded-3xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex flex-col justify-center items-center relative overflow-hidden group min-h-[250px]"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      
      {loading ? (
        <div className="relative z-10 flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
          <span className="text-white/60 font-medium text-sm">Syncing with GitHub...</span>
        </div>
      ) : data ? (
        <a 
          href="https://github.com/MohammadGhorbani-dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="relative z-10 w-full h-full flex flex-col items-center justify-between gap-6"
        >
          <div className="flex flex-col items-center gap-3">
            <img 
              src={data.avatar_url} 
              alt="GitHub Avatar" 
              className="w-20 h-20 rounded-full border-2 border-white/20 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white/90">{data.name || data.login}</h3>
              <p className="text-sm text-blue-400">@GitHub</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 bg-black/20 px-5 py-4 rounded-2xl border border-white/5 shadow-inner w-full">
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50 uppercase tracking-wider flex items-center gap-2">
                <Folder size={14} /> Total Repos
              </span>
              <span className="font-semibold text-white/90">{data.public_repos}</span>
            </div>
            <div className="w-full h-[1px] bg-white/5"></div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/50 uppercase tracking-wider flex items-center gap-2">
                <Clock size={14} /> Last Active
              </span>
              <span className="text-sm text-white/80">{formatDate(data.updated_at)}</span>
            </div>
            {data.latest_repo && (
              <>
                <div className="w-full h-[1px] bg-white/5"></div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50 uppercase tracking-wider flex items-center gap-2">
                    <GitCommit size={14} /> Latest Push
                  </span>
                  <span className="text-sm text-blue-400 font-medium max-w-[120px] truncate" title={data.latest_repo}>
                    {data.latest_repo}
                  </span>
                </div>
              </>
            )}
          </div>
        </a>
      ) : (
        <div className="relative z-10 text-white/50 text-sm">Failed to load GitHub stats.</div>
      )}
    </motion.div>
  );
}
