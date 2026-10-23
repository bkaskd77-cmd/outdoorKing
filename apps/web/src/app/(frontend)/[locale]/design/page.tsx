import { brandName } from "@ok/config";
import { env } from "@ok/env/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  Checkbox,
  Container,
  Heading,
  Input,
  Section,
  Select,
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Text,
  Textarea,
} from "@ok/ui";
import { notFound } from "next/navigation";

export default function DesignSystemPage() {
  if (env.VERCEL_ENV === "production") notFound();

  return (
    <main id="content" className="py-16">
      <Container className="grid gap-12">
        <header>
          <p className="eyebrow">Design system</p>
          <Heading as="h1">{brandName} primitives</Heading>
          <Text muted>Available on preview and local only.</Text>
        </header>

        <Section className="px-0">
          <Heading as="h2">Buttons</Heading>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="magnetic">Magnetic CTA</Button>
          </div>
        </Section>

        <Section className="px-0">
          <Heading as="h2">Card, badge, skeleton</Heading>
          <Card className="mt-4 max-w-sm">
            <Badge>Everest · 14 days</Badge>
            <Heading as="h3" className="mt-3">
              Everest Base Camp, privately
            </Heading>
            <Text muted>Design this trip in Phase 1.</Text>
            <Skeleton className="mt-4 h-32 w-full" />
          </Card>
        </Section>

        <Section className="px-0">
          <Heading as="h2">Forms</Heading>
          <div className="mt-4 grid max-w-md gap-4">
            <Input aria-label="Name" placeholder="Name" />
            <Textarea aria-label="Message" placeholder="How do you like to travel?" />
            <Checkbox label="I have read the privacy policy" />
            <Select
              label="Season"
              options={[
                { value: "spring", label: "Spring" },
                { value: "autumn", label: "Autumn" },
              ]}
            />
          </div>
        </Section>

        <Section className="px-0">
          <Heading as="h2">Accordion and tabs</Heading>
          <Accordion type="single" collapsible className="mt-4 max-w-xl">
            <AccordionItem value="a">
              <AccordionTrigger>What is TIMS?</AccordionTrigger>
              <AccordionContent>
                A Nepal trekking registration system. OutdoorKing handles TIMS paperwork
                for private journeys.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Tabs defaultValue="one" className="mt-8">
            <TabsList>
              <TabsTrigger value="one">One</TabsTrigger>
              <TabsTrigger value="two">Two</TabsTrigger>
            </TabsList>
            <TabsContent value="one">First panel</TabsContent>
            <TabsContent value="two">Second panel</TabsContent>
          </Tabs>
        </Section>
      </Container>
    </main>
  );
}
