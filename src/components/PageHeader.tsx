"use client";

import SectionHeader from "./SectionHeader";
import { Breadcrumb, BreadcrumbItem } from "./Breadcrumb";
import { cn } from "@/lib/utils";
import { Card } from "./Card";

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
  breadcrumbItems: BreadcrumbItem[];
  className?: string;
}

export function PageHeader({
  badge,
  title,
  description,
  breadcrumbItems,
  className = "",
}: PageHeaderProps) {
  return (
    <section className={cn("relative pt-24 sm:pt-32 pb-8 sm:pb-12", className)}>
      <div className="container relative mx-auto max-w-[95vw] sm:max-w-[90vw] md:max-w-312.5 px-4 sm:px-6  ">
        {/* Breadcrumb */}
        <div className="mb-6 sm:mb-8">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Section Header */}
        <Card animated className="h-full">
          <SectionHeader
            badge={badge}
            enableSvgBackground={true}
            title={title}
            description={description}
          />
        </Card>
      </div>
    </section>
  );
}

export default PageHeader;
