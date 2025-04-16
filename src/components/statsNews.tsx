import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";

export default function StatsNews() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mx-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Publicado</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Previews</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Borrador</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </div>
  );
}
