import subprocess
import os

def run_git_cmd(cmd):
    print(f"Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"FAILED: {result.stderr}")
    else:
        print(f"SUCCESS: {result.stdout}")
    return result.returncode

base_dir = r"e:\Archivos\Antigravity\Testing\MuzicMania"
os.chdir(base_dir)

# 1. Ensure config is correct
run_git_cmd(["git", "remote", "set-url", "origin", "https://github.com/CiszukoAntony/MuzicMania"])

# 2. Add remotes for push
run_git_cmd(["git", "remote", "set-url", "--push", "--add", "origin", "https://github.com/CiszukoAntony/MuzicMania"])
run_git_cmd(["git", "remote", "set-url", "--push", "--add", "origin", "https://gitlab.com/ciszu-network/MuzicMania"])
run_git_cmd(["git", "remote", "set-url", "--push", "--add", "origin", "https://bitbucket.org/ciszu-network/muzicmania"])

# 3. Final Push
print("\n--- ATTEMPTING FINAL PUSH ---")
run_git_cmd(["git", "add", "."])
run_git_cmd(["git", "commit", "-m", "FIX: Final production redeploy - ESLint v9 and Vercel module deployment"])
run_git_cmd(["git", "push", "origin", "main", "--force"])
