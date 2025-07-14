import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const skills = {
  'Cloud & DevOps': ['AWS (EC2, S3, Kinesis, Lambda, Glue)', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'],
  'Data Warehousing': ['Snowflake', 'Amazon Redshift', 'BigQuery', 'Data Modeling', 'ETL/ELT'],
  'Data Processing': ['Apache Spark', 'Dataiku DSS', 'dbt', 'Airflow', 'Kafka'],
  'Programming Languages': ['Python', 'SQL', 'Scala', 'Java'],
  'Databases': ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB'],
  'BI & Visualization': ['Tableau', 'Power BI', 'Looker', 'Metabase'],
};

export default function Skills() {
  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Technical Skills</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            My proficiency in various technologies across the data engineering landscape.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(skills).map(([category, list]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {list.map((skill) => (
                    <Badge key={skill} variant="default" className="text-sm font-medium bg-primary/80 hover:bg-primary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
