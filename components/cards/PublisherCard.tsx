import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { IPublisher } from "@/database/publisher.model";

interface PublisherCardProps {
  publisher: IPublisher;
}

export default function PublisherCard({ publisher }: PublisherCardProps) {
  return (
    <Link
      href={`/books?publisher=${publisher?._id}`}
      className="flex flex-col p-4 border rounded-lg hover:border-primary transition-colors h-full"
    >
      <div className="h-12 flex items-center mb-2">
        <div className="relative h-8 w-full">
          <Image
            src={publisher?.logo || "/placeholder.svg"}
            alt={publisher?.name}
            fill
            className="object-contain object-left"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
        </div>
      </div>
      <h3 className="font-medium">{publisher?.name}</h3>
      <div className="flex items-center mt-2 text-xs text-primary">
        Publisher Books <ExternalLink className="ml-1 h-3 w-3" />
      </div>
    </Link>
  );
}
