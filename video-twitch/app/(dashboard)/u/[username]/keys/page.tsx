import { Button } from "@/components/ui/button";
import { UrlCard } from "./_components/url-card";
import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";

const KeysPage = async () => {
  const self = await getSelf(); // Fixed: Added missing semicolon.
  const stream = await getStreamByUserId(self.id); // Fixed: Added missing semicolon.

  if (!stream) {
    throw new Error("Stream not found"); // Fixed: Added missing semicolon.
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Keys & URLs</h1>
        <Button variant="primary">Generate</Button>
      </div>
      <div className="space-y-4">
        <UrlCard value={stream.serverUrl} />
      </div>
    </div>
  );
};

export default KeysPage;
