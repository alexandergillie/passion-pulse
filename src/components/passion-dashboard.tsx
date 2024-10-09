import { useState } from "react"
import { Plus, ChevronDown, ChevronUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const initialPassions = [
  { id: 1, title: "Home Renovation", color: "bg-blue-500", tasks: ["Plan layout", "Choose materials"], expanded: false },
  { id: 2, title: "Fitness Goals", color: "bg-green-500", tasks: ["Set up gym schedule", "Meal prep"], expanded: false },
  { id: 3, title: "Career Development", color: "bg-purple-500", tasks: ["Update resume", "Network"], expanded: false },
]

export function PassionDashboard() {
  const [passions, setPassions] = useState<Passion[]>(initialPassions)
  const [newPassion, setNewPassion] = useState("")
  const [selectedPassion, setSelectedPassion] = useState<Passion>(initialPassions[0])
  const [newTask, setNewTask] = useState("")
  const [isAddingPassion, setIsAddingPassion] = useState(false)

  const addPassion = () => {
    if (newPassion.trim() !== "") {
      const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-yellow-500", "bg-pink-500"]
      const newPassionObj = {
        id: passions.length + 1,
        title: newPassion,
        color: colors[Math.floor(Math.random() * colors.length)],
        tasks: [],
        expanded: false,
      }
      setPassions([...passions, newPassionObj])
      setNewPassion("")
      setIsAddingPassion(false)
    }
  }

  const addTask = () => {
    if (newTask.trim() !== "" && selectedPassion) {
      const updatedPassions = passions.map((passion) => {
        if (passion.id === selectedPassion.id) {
          return { ...passion, tasks: [...passion.tasks, newTask] }
        }
        return passion
      })
      setPassions(updatedPassions)
      setNewTask("")
    }
  }

  const togglePassionExpansion = (id: number) => {
    setPassions(passions.map(passion => 
      passion.id === id ? { ...passion, expanded: !passion.expanded } : passion
    ))
  }

  return (
    <div className="container mx-auto p-4 relative min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Passions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {passions.map((passion) => (
          <Card key={passion.id} className="flex flex-col">
            <CardHeader 
              className={`${passion.color} text-white rounded-t-lg cursor-pointer`}
              onClick={() => togglePassionExpansion(passion.id)}
            >
              <CardTitle className="flex justify-between items-center">
                {passion.title}
                {passion.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </CardTitle>
            </CardHeader>
            {passion.expanded && (
              <CardContent className="flex-grow">
                <ul className="list-disc list-inside">
                  {passion.tasks.map((task, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {task}
                    </li>
                  ))}
                </ul>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="mt-4 w-full">Manage Tasks</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{passion.title}</DialogTitle>
                      <DialogDescription>Manage your passion and tasks</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex items-center gap-4">
                        <Input
                          placeholder="Add a new task"
                          value={newTask}
                          onChange={(e) => setNewTask(e.target.value)}
                        />
                        <Button onClick={() => {
                          setSelectedPassion(passion)
                          addTask()
                        }}>
                          Add Task
                        </Button>
                      </div>
                      <ul className="list-disc list-inside">
                        {passion.tasks.map((task, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span>{task}</span>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <X className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
      <Button
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg"
        onClick={() => setIsAddingPassion(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
      <Dialog open={isAddingPassion} onOpenChange={setIsAddingPassion}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Passion</DialogTitle>
            <DialogDescription>Enter the name of your new passion</DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Enter passion name"
            value={newPassion}
            onChange={(e) => setNewPassion(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={addPassion}>Add Passion</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}