import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

const IngredientCard = ({title, contents}: {
    title: string,
    contents: string[]
}) => {
    return (
        <Card className="w-[300px]">
            <CardHeader className="pb-3">
                <CardTitle className="italic">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="list-disc list-inside text-gray-500">
                    {
                        contents.map((content, index) => (
                            <li key={index}>{content}</li>
                        ))
                    }
                </ul>
            </CardContent>
        </Card>
    )
}

export default IngredientCard;