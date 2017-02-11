import { Component, Input } from '@angular/core';
import { FamilyMemberViewModel, Coverage, Sex } from './model/family-member.viewmodel';

@Component({
  selector: 'asm-family-member',
  templateUrl: './family-member.component.html',
  styleUrls: ['./family-member.component.scss']
})
export class FamilyMemberComponent {
  @Input() public familyMember: FamilyMemberViewModel = {};

  get hasSicknessComplementaryRights(): boolean {
    return this.familyMember.sicknessCoverage === Coverage.Complementary;
  }

  get hasSicknessFullRights(): boolean {
    return this.familyMember.sicknessCoverage === Coverage.Full;
  }

  get hasAccidentComplementaryRights(): boolean {
    return this.familyMember.accidentCoverage === Coverage.Complementary;
  }

  get hasAccidentFullRights(): boolean {
    return this.familyMember.accidentCoverage === Coverage.Full;
  }

  get isMale(): boolean {
    return this.familyMember.sex === Sex.Male;
  }

  get isFemale(): boolean {
    return this.familyMember.sex === Sex.Female;
  }

  get isSexUnknown(): boolean {
    return this.familyMember.sex === Sex.Unknown || this.familyMember.sex === undefined;
  }

  getBirthAndDeathDates(): string {
    const birthDate = this.familyMember.birthDate;
    const deathDate = this.familyMember.deathDate;

    if (birthDate && deathDate) {
      return `${birthDate} - ${deathDate}`;
    } if (!birthDate && deathDate) {
      return `(?) - ${deathDate}`;
    } else if (!birthDate && !deathDate) {
      return `(?)`;
    } else {
      return birthDate;
    }
  }
}
