import { IconUserPlus } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { courses, currentStudent } from "@/lib/mock-data";

export function RegisterDialog() {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault(); // ไม่ให้หน้าเว็บ reload
    setCourseId(""); // เคลียร์ฟอร์ม
    setOpen(false); // ปิด Dialog
  }

  const activeCourses = courses.filter(
    (course) => !currentStudent.courses?.includes(course.courseId),
  );

  const [selectedTime] = useState(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger>
        <Button>
          <IconUserPlus className="mr-2 h-4 w-4" />
          ลงทะเบียน
        </Button>
      </DialogTrigger>

      {/* ฟอร์มที่แสดงออกมาเมื่อกดปุ่ม */}
      <DialogContent className="max-w-[720px] rounded-2xl p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>
              เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="courseId"> วิชา </Label>
            <Select onValueChange={(value) => setCourseId(String(value))}>
              <SelectTrigger className="w-full truncate" id="courseId">
                <SelectValue className="w-0" placeholder="เลือกวิชา"/>
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>วิชา</SelectLabel>

                  {activeCourses.map((course) => (
                    <SelectItem
                      key={course.courseId}
                      value={course.courseId + "-" + course.courseTitle}
                    >
                      <span className="whitespace-normal break-words leading-relaxed">
                        {course.courseId} – {course.courseTitle}
                      </span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-picker-optional">เลือกเวลา</Label>
            <Input
              type="time"
              id="time-picker-optional"
              defaultValue={selectedTime}
              className="text-foreground accent-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="studentName">ชื่อ นศ.</Label>
            <Input
              id="studentName"
              value={`${currentStudent.firstName} ${currentStudent.lastName}`}
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input id="program" value={currentStudent.program} readOnly />
          </div>

          <DialogFooter>
            <Button 
            type="submit"
            disabled={courseId === ""}
            >
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
