"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AP_QUESTION_TYPES,
  ATL_SKILLS,
  COMMAND_TERMS,
  DP_LEVELS,
  IB_PAPERS,
  IB_SUBJECT_GROUPS,
  MYP_CRITERIA,
  MYP_YEARS,
} from "@/lib/tools/curricula";
import { getToolSubject } from "@/lib/tools/subjects";
import type { ApSettings, CurriculumMode, IbSettings } from "@/lib/tools/types";
import { cn } from "@/lib/utils";

interface LevelSelectorProps {
  curriculum: CurriculumMode;
  subjectId: string;
  ib: IbSettings;
  ap: ApSettings;
  onIbChange: (next: Partial<IbSettings>) => void;
  onApChange: (next: Partial<ApSettings>) => void;
}

export function LevelSelector({
  curriculum,
  subjectId,
  ib,
  ap,
  onIbChange,
  onApChange,
}: LevelSelectorProps) {
  const subject = getToolSubject(subjectId);

  if (curriculum === "ap") {
    const courses = Array.from(
      new Set([...subject.apCourses, ap.course].filter(Boolean)),
    );

    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="ap-course">AP course</Label>
          <Select value={ap.course} onValueChange={(course) => onApChange({ course })}>
            <SelectTrigger id="ap-course">
              <SelectValue placeholder="Choose a course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Courses listed for {subject.name}. Teaching something else? Pick the closest
            and edit the course name in the prompt.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="ap-question-type">Question type</Label>
          <Select
            value={ap.questionType}
            onValueChange={(questionType) => onApChange({ questionType })}
          >
            <SelectTrigger id="ap-question-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AP_QUESTION_TYPES.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Sets the format, point values, and scoring notes in the generated material.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label htmlFor="ib-programme">Programme</Label>
          <Select
            value={ib.programme}
            onValueChange={(programme) =>
              onIbChange({ programme: programme as IbSettings["programme"] })
            }
          >
            <SelectTrigger id="ib-programme">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MYP">MYP</SelectItem>
              <SelectItem value="DP">Diploma Programme</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {ib.programme === "MYP" ? (
          <div className="space-y-1.5">
            <Label htmlFor="myp-year">MYP year</Label>
            <Select
              value={ib.mypYear}
              onValueChange={(mypYear) =>
                onIbChange({ mypYear: mypYear as IbSettings["mypYear"] })
              }
            >
              <SelectTrigger id="myp-year">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MYP_YEARS.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="space-y-1.5">
            <Label htmlFor="dp-level">Level</Label>
            <Select
              value={ib.dpLevel}
              onValueChange={(dpLevel) =>
                onIbChange({ dpLevel: dpLevel as IbSettings["dpLevel"] })
              }
            >
              <SelectTrigger id="dp-level">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DP_LEVELS.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="ib-group">Subject group</Label>
          <Select
            value={ib.subjectGroup}
            onValueChange={(subjectGroup) => onIbChange({ subjectGroup })}
          >
            <SelectTrigger id="ib-group">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {IB_SUBJECT_GROUPS.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {ib.programme === "DP" ? (
          <div className="space-y-1.5">
            <Label htmlFor="ib-paper">Paper</Label>
            <Select value={ib.paper} onValueChange={(paper) => onIbChange({ paper })}>
              <SelectTrigger id="ib-paper">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {IB_PAPERS.map((paper) => (
                  <SelectItem key={paper} value={paper}>
                    {paper}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Sets format, timing, and mark conventions for that paper.
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            <Label htmlFor="myp-criterion">Assessment criterion</Label>
            <Select
              value={ib.criterion}
              onValueChange={(criterion) => onIbChange({ criterion })}
            >
              <SelectTrigger id="myp-criterion">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MYP_CRITERIA.map((criterion) => (
                  <SelectItem key={criterion} value={criterion}>
                    {criterion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Strand wording differs by subject group — check yours against the subject
              guide.
            </p>
          </div>
        )}

        <div className="space-y-1.5">
          <span className="text-sm font-medium">ATL skills</span>
          <div className="flex flex-wrap gap-1.5">
            {ATL_SKILLS.map((skill) => {
              const active = ib.atlSkills.includes(skill);
              return (
                <button
                  key={skill}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    onIbChange({
                      atlSkills: active
                        ? ib.atlSkills.filter((item) => item !== skill)
                        : [...ib.atlSkills, skill],
                    })
                  }
                  className={cn(
                    "rounded-md border px-2 py-1 text-xs transition-colors",
                    active
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground",
                  )}
                >
                  {skill.replace(" skills", "")}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <span className="text-sm font-medium">Command terms</span>
        <p className="text-xs text-muted-foreground">
          Each term carries a level of demand. Pick the ones the questions should
          actually reach.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {COMMAND_TERMS.map(({ term, level }) => {
            const active = ib.commandTerms.includes(term);
            return (
              <button
                key={term}
                type="button"
                aria-pressed={active}
                title={`${term} — ${level}`}
                onClick={() =>
                  onIbChange({
                    commandTerms: active
                      ? ib.commandTerms.filter((item) => item !== term)
                      : [...ib.commandTerms, term],
                  })
                }
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition-colors",
                  active
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground",
                )}
              >
                {term}
                <span className="font-mono text-[0.625rem] uppercase opacity-60">
                  {level}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
